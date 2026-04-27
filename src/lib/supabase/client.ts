import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase Environment Variables. Check your Vercel Project Settings.");
    // Return a proxy or dummy to prevent immediate crash during build pre-rendering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
