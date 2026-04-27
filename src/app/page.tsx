"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      setLoading(false);
      // Hardcode a user redirect based on email input for demo purposes
      if (identifier.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else if (identifier.toLowerCase().includes("registrar")) {
        router.push("/admin/registry");
      } else if (identifier.toLowerCase().includes("finance")) {
        router.push("/admin/finance");
      } else if (identifier.toLowerCase().includes("lecturer")) {
        router.push("/lecturer");
      } else {
        router.push("/student/dashboard");
      }
      router.refresh();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#001a40] p-8 text-center">
          <div className="bg-white w-24 h-24 mx-auto rounded-lg p-2 mb-4 flex items-center justify-center">
            <Image 
              src="/cuu-logo.png" 
              alt="Cavendish University Logo" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">Cavendish University Uganda</h1>
          <p className="text-blue-100/80 text-sm mt-1 font-medium">Student Records Management System</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email / Username */}
            <div>
              <label className="text-slate-700 text-sm font-semibold block mb-2">
                Email Address or Username
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#001a40] transition-colors">
                  <User size={20} />
                </div>
                <input
                  id="identifier"
                  type="text"
                  placeholder="e.g. user@students.cavendish.ac.ug"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#001a40]/10 focus:border-[#001a40] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-700 text-sm font-semibold block mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#001a40] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg pl-11 pr-12 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#001a40]/10 focus:border-[#001a40] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#001a40] focus:ring-[#001a40]" 
                />
                <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900">Remember me</span>
              </label>
              <button onClick={() => alert('Feature in development...')}  type="button" className="text-[#001a40] text-sm font-bold hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#001a40] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#002a60] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                "Sign In to Portal"
              )}
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              New to the portal?{" "}
              <Link href="/enroll" className="text-[#001a40] font-bold hover:underline">
                Apply for Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

