"use client";

import Link from "next/link";
import { BookOpen, Wallet, CalendarDays, TrendingUp, AlertCircle, Award, Map, User, Lock } from "lucide-react";

const profile = { full_name: "Egabo Aaron", campus: "Ggaba Campus" };
const student = {
  cgpa: 4.25, credits_earned: 86, credits_remaining: 34,
  programme: "BSc Software Engineering", year_of_study: 3, student_number: "258-154"
};
const finance = { balance_ugx: 1_250_000, due_date: "2026-05-27T00:00:00Z", status: "pending" };
const events = [
  { id: 1, title: "Mid-Semester Exams Begin", event_date: "2026-04-15T00:00:00Z" },
  { id: 2, title: "Coursework Upload Deadline", event_date: "2026-05-20T00:00:00Z" },
  { id: 3, title: "Final Examinations", event_date: "2026-06-10T00:00:00Z" },
];
const HAS_BALANCE = finance.balance_ugx > 0;

export default function StudentDashboard() {
  const gradeClass = student.cgpa >= 4.6 ? "First Class" : student.cgpa >= 4.0 ? "Upper Second" : "Lower Second";

  return (
    <main className="w-full pb-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
        {/* Profile Image Section */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-primary/20 overflow-hidden bg-primary/10 flex items-center justify-center shadow-lg">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=egabo_aaron`}
              alt={profile.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-finance-success text-white p-1 rounded-full border-2 border-white shadow-sm" title="Online Status">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-black text-on-surface">Welcome back,</h1>
          <p className="text-2xl font-bold text-primary">{profile.full_name}</p>
          <p className="text-sm text-on-surface-variant mt-1">{student.programme} · {profile.campus}</p>
          {student.student_number && (
            <span className="inline-block mt-2 px-2 py-1 bg-surface-container text-xs font-bold text-outline rounded uppercase tracking-wider">
              {student.student_number}
            </span>
          )}
        </div>
      </div>

      {/* Outstanding Balance Alert */}
      {HAS_BALANCE && (
        <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-xl flex items-center gap-3">
          <AlertCircle className="text-error shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-sm font-bold text-error">Outstanding Balance: UGX {finance.balance_ugx.toLocaleString()}</p>
            <p className="text-xs text-error/80">Results, exam permits, and exam registration are locked until cleared.</p>
          </div>
          <Link href="/student/finance" className="text-xs font-bold text-white bg-error px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
            Pay Now
          </Link>
        </div>
      )}

      {/* Primary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">

        {/* Academics */}
        <Link href="/student/academics" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="text-primary" size={20} />
              </div>
              <span className="font-semibold text-slate-700">Academics</span>
            </div>
            <TrendingUp className="text-slate-300" size={20} />
          </div>
          <p className="text-sm text-slate-500 mb-1">Current CGPA</p>
          <p className="text-3xl font-black text-primary">{student.cgpa.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">Year {student.year_of_study} · {student.credits_earned} credits · <span className="text-finance-success font-semibold">{gradeClass}</span></p>
        </Link>

        {/* Finance */}
        <Link href="/student/finance" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center group-hover:bg-error/20 transition-colors">
                <Wallet className="text-error" size={20} />
              </div>
              <span className="font-semibold text-slate-700">Finance</span>
            </div>
            {HAS_BALANCE && <AlertCircle className="text-error" size={18} />}
          </div>
          <p className="text-sm text-slate-500 mb-1">Outstanding Balance</p>
          <p className={`text-2xl font-black ${HAS_BALANCE ? "text-error" : "text-finance-success"}`}>
            {HAS_BALANCE ? `UGX ${finance.balance_ugx.toLocaleString()}` : "CLEARED"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Due: {new Date(finance.due_date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </Link>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sis-accent/10 rounded-lg flex items-center justify-center">
              <CalendarDays className="text-sis-accent" size={20} />
            </div>
            <span className="font-semibold text-slate-700">Upcoming Events</span>
          </div>
          <div className="space-y-3">
            {events.map(event => {
              const d = new Date(event.event_date);
              return (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="text-center min-w-[40px]">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{d.toLocaleDateString("en-UG", { month: "short" })}</p>
                    <p className="text-xl font-black text-primary leading-tight">{d.getDate()}</p>
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{event.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* My Results */}
        <Link href="/student/results" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-sis-accent/10 rounded-lg flex items-center justify-center group-hover:bg-sis-accent/20 transition-colors">
              <Award className="text-sis-accent" size={20} />
            </div>
            <span className="font-semibold text-slate-700">My Results</span>
          </div>
          {HAS_BALANCE
            ? <div className="flex items-center gap-2 text-error">
                <Lock size={16} /><p className="text-sm font-bold">Locked — clear balance</p>
              </div>
            : <p className="text-sm text-slate-500">View semester grades, GPA and retake applications.</p>
          }
        </Link>

        {/* Semester Roadmap */}
        <Link href="/student/roadmap" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Map className="text-purple-600" size={20} />
            </div>
            <span className="font-semibold text-slate-700">Semester Roadmap</span>
          </div>
          <p className="text-sm text-slate-500">Track key academic dates, deadlines and milestones.</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-xs font-bold text-blue-600">Coursework due May 20</span>
          </div>
        </Link>

        {/* My Profile */}
        <Link href="/student/profile" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <User className="text-slate-600" size={20} />
            </div>
            <span className="font-semibold text-slate-700">My Profile</span>
          </div>
          <p className="text-sm text-slate-500">View your Virtual ID, documents, and personal details.</p>
          <p className="text-xs text-primary font-semibold mt-2">{profile.full_name} · CUU-2024-258154</p>
        </Link>
      </div>
    </main>
  );
}
