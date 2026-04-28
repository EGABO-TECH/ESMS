"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: userLoaded, user } = useUser();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle RBAC redirection once user is loaded
  useEffect(() => {
    if (userLoaded && user) {
      // Role can be in unsafeMetadata (if signed up via our custom form) or publicMetadata
      const rawRole = (user.unsafeMetadata as any)?.role || (user.publicMetadata as any)?.role || "student";
      const role = rawRole.toString().toLowerCase();
      
      switch (role) {
        case "administrator":
        case "admin":
          router.push("/admin");
          break;
        case "registrar":
          router.push("/registrar");
          break;
        case "finance officer":
        case "finance":
          router.push("/finance");
          break;
        case "lecturer":
          router.push("/lecturer");
          break;
        case "student":
        default:
          router.push("/student/dashboard");
          break;
      }
      router.refresh();
    }
  }, [userLoaded, user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier,
        password,
        strategy: "password"
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login successful! Redirecting...");
      } else {
        console.error("Incomplete sign in:", result);
        toast.error(`Login incomplete. Status: ${result.status}`);
      }
    } catch (err: any) {
      console.error("Login error object:", err);
      if (err.errors && err.errors.length > 0) {
        toast.error(err.errors[0].longMessage || err.errors[0].message);
      } else {
        toast.error(err.message || "An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
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

