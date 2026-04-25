-- ============================================================
-- FIX: Add missing INSERT policies and fix trigger permissions
-- Run this in Supabase SQL Editor AFTER the main schema.sql
-- ============================================================

-- 1. Allow the trigger function to insert new profiles
--    (trigger runs as SECURITY DEFINER but needs explicit RLS bypass)
CREATE POLICY "Allow trigger to insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- 2. Allow authenticated users to read their own profile on first load
-- (already exists, but adding insurance for the invite flow)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 3. Fix the trigger function to be more robust
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _role user_role;
  _full_name TEXT;
BEGIN
  -- Determine role from email domain
  IF NEW.email LIKE '%@students.cavendish.ac.ug' THEN
    _role := 'student'::user_role;
  ELSIF NEW.email LIKE '%@cavendish.ac.ug' THEN
    _role := 'staff'::user_role;
  ELSE
    _role := 'student'::user_role;
  END IF;

  -- Get name from metadata or derive from email
  _full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    initcap(split_part(NEW.email, '@', 1))
  );

  INSERT INTO public.profiles (id, full_name, role, campus)
  VALUES (NEW.id, _full_name, _role, 'Main Campus')
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error but don't block user creation
  RAISE WARNING 'handle_new_user failed: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Re-create trigger to ensure it's attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Verify: Show current policies on profiles
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;
