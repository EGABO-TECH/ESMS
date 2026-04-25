import Link from "next/link";
import { ArrowRight, ShieldCheck, User, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-bg text-on-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full mix-blend-multiply"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-sis-accent/10 blur-[100px] rounded-full mix-blend-multiply"></div>
      </div>

      <div className="max-w-4xl w-full z-10 relative">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-lg p-4 mb-6 flex items-center justify-center">
            <img src="/cuu-logo.png" alt="CUU Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Enterprise School Management System</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Welcome to the Cavendish University Uganda central portal. Select your role below to access your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin" className="group bg-white p-8 rounded-2xl shadow-sm border border-border-subtle hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Administrator</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Access the main control panel, manage admissions, staff, finance, and system settings.
            </p>
            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Access Portal</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>

          <Link href="/admin/registry" className="group bg-white p-8 rounded-2xl shadow-sm border border-border-subtle hover:shadow-xl hover:border-sis-accent/30 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="text-sis-accent" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Staff / Registry</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Manage student enrollments, course registrations, academic records, and workflows.
            </p>
            <div className="flex items-center text-sis-accent font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Access Portal</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>

          <Link href="/student/dashboard" className="group bg-white p-8 rounded-2xl shadow-sm border border-border-subtle hover:shadow-xl hover:border-finance-success/30 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-finance-success" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Portal</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              View your academic performance, real-time finance ledger, and upcoming events.
            </p>
            <div className="flex items-center text-finance-success font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Access Portal</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
