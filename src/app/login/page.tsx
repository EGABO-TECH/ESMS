"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

// Google SVG Icon
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.3441 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2822-1.71V4.9582H.9573C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email + Password Sign In
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      router.push("/");
      router.refresh();
    }
  };

  // Google OAuth Sign In
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          // Prompt account selection every time
          prompt: "select_account",
        },
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
    // On success, Supabase redirects the browser automatically
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10 relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-2xl p-3 mb-4 flex items-center justify-center">
            <GraduationCap className="text-primary w-full h-full" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Cavendish University</h1>
          <p className="text-slate-400 text-sm mt-1 font-medium uppercase tracking-widest">Student Information System</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to access your portal</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={16} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            id="google-signin"
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full py-3 bg-white text-slate-800 font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 disabled:opacity-60 transition-all mb-6 shadow-sm"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-xs font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email + Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-1.5">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="email"
                  type="email"
                  placeholder="ea258154@students.cavendish.ac.ug"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-lg pl-10 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-primary text-sm hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                "Sign In to Portal"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-500 text-xs">
              Having trouble? Contact{" "}
              <a href="mailto:itsupport@cavendish.ac.ug" className="text-primary hover:underline">
                itsupport@cavendish.ac.ug
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} Cavendish University Uganda · Enterprise School Management System
        </p>
      </div>
    </main>
  );
}
