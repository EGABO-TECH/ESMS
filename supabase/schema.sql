-- ============================================================
-- CAVENDISH UNIVERSITY UGANDA - School Management System
-- Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student');
CREATE TYPE admission_status AS ENUM ('pending', 'interview', 'offer', 'enrolled', 'rejected');
CREATE TYPE finance_status AS ENUM ('cleared', 'partial', 'arrears');
CREATE TYPE transaction_status AS ENUM ('confirmed', 'pending', 'failed');

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  campus TEXT DEFAULT 'Main Campus',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins and staff can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admins can update any profile" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE
      WHEN NEW.email LIKE '%@cavendish.ac.ug' THEN 'staff'::user_role
      WHEN NEW.email LIKE '%@students.cavendish.ac.ug' THEN 'student'::user_role
      ELSE 'student'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE TABLE students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  student_number TEXT UNIQUE NOT NULL,
  programme TEXT NOT NULL,
  year_of_study INTEGER DEFAULT 1,
  cgpa NUMERIC(3,2) DEFAULT 0.00,
  credits_earned INTEGER DEFAULT 0,
  credits_remaining INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own record" ON students
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Admin and staff view all students" ON students
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin can manage students" ON students
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- STAFF
-- ============================================================
CREATE TABLE staff (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  staff_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and staff can view staff" ON staff
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin can manage staff" ON staff
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  semester INTEGER NOT NULL,
  year INTEGER NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view courses" ON courses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage courses" ON courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- ENROLLMENTS (Grades)
-- ============================================================
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  grade CHAR(2),
  grade_points NUMERIC(3,1),
  semester INTEGER NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT DEFAULT 'enrolled',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id, semester, academic_year)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own enrollments" ON enrollments
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
  );

CREATE POLICY "Admin and staff view all enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin and staff manage enrollments" ON enrollments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- ============================================================
-- FINANCE RECORDS
-- ============================================================
CREATE TABLE finance_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  fee_type TEXT NOT NULL, -- 'tuition', 'functional', 'examination', 'registration'
  amount_ugx BIGINT NOT NULL,
  paid_ugx BIGINT DEFAULT 0,
  balance_ugx BIGINT GENERATED ALWAYS AS (amount_ugx - paid_ugx) STORED,
  due_date DATE,
  academic_year TEXT NOT NULL,
  semester INTEGER NOT NULL,
  status finance_status DEFAULT 'arrears',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE finance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own finance" ON finance_records
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
  );

CREATE POLICY "Admin and staff view all finance" ON finance_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin and staff manage finance" ON finance_records
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- ============================================================
-- TRANSACTIONS
-- ============================================================
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount_ugx BIGINT NOT NULL,
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  reference TEXT,
  payment_method TEXT, -- 'mobile_money', 'bank_transfer', 'cash'
  status transaction_status DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own transactions" ON transactions
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
  );

CREATE POLICY "Admin and staff view all transactions" ON transactions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin and staff manage transactions" ON transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- ============================================================
-- SCHOOL EVENTS (Calendar)
-- ============================================================
CREATE TABLE school_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE school_events ENABLE ROW LEVEL SECURITY;

-- Everyone can view events
CREATE POLICY "All authenticated users can view events" ON school_events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admin and staff can create/edit/delete events
CREATE POLICY "Admin and staff can manage events" ON school_events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- ============================================================
-- ADMISSIONS
-- ============================================================
CREATE TABLE admissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  programme TEXT NOT NULL,
  nationality TEXT DEFAULT 'Ugandan',
  status admission_status DEFAULT 'pending',
  documents JSONB DEFAULT '{}',
  notes TEXT,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and staff can view admissions" ON admissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin and staff can manage admissions" ON admissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- ============================================================
-- SEED DATA (School Events)
-- ============================================================
INSERT INTO school_events (title, description, event_date, event_time) VALUES
  ('End of Semester Examinations', 'Main campus examination week begins for all faculties.', '2024-11-15', '08:00:00'),
  ('Course Registration Deadline', 'Last day to register for Semester 2, 2024/2025 courses.', '2024-11-01', '23:59:00'),
  ('Graduation Ceremony 2024', 'Annual graduation ceremony for class of 2024.', '2024-12-14', '09:00:00'),
  ('Fee Payment Deadline', 'Last day to clear tuition fees for Semester 1.', '2024-10-15', '23:59:00');

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_students_profile_id ON students(profile_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_transactions_student_id ON transactions(student_id);
CREATE INDEX idx_finance_records_student_id ON finance_records(student_id);
CREATE INDEX idx_school_events_event_date ON school_events(event_date);
CREATE INDEX idx_admissions_status ON admissions(status);
