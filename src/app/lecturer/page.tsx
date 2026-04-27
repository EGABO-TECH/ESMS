"use client";

import { BookOpen, Users, ClipboardList, GraduationCap, ArrowRight, Clock, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function LecturerDashboard() {
  const { courses } = useGlobalContext();

  const stats = [

    { title: "Current Modules", value: "4", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", trend: "42 contact hours" },
    { title: "Avg. Attendance", value: "88%", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "High engagement" },
    { title: "Grading Tasks", value: "14", icon: ClipboardList, color: "text-amber-600", bg: "bg-amber-50", trend: "Internal deadlines" },
    { title: "Class Performance", value: "+4.2%", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50", trend: "vs Previous Semester" },
  ];

  const myCourses = courses.slice(0, 4);


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Lecturer Dashboard</h1>
          <p className="text-slate-500 mt-1">Course Management & Student Performance</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Loading teaching materials...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            Teaching Materials
          </button>
          <Link href="/lecturer/grades">
            <button onClick={() => alert('Feature in development...')}  className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
              Open Grading Center <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Faculty Insight</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-slate-400">
              <CheckCircle size={14} className="text-emerald-500" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Current Course Load</h2>
            <Link href="/lecturer/courses" className="text-indigo-600 text-sm font-bold hover:underline">Manage All Courses</Link>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCourses.map((c, i) => (
              <div key={i} className="p-5 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-full">
                    {c.code}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Users size={12} /> {c.students} Students
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-900">{c.name}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-end text-[10px] font-bold">
                    <span className="text-slate-400 uppercase tracking-wider">Syllabus Progress</span>
                    <span className="text-indigo-600">{c.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-2">
                    <Clock size={14} className="text-indigo-400" />
                    Next: <span className="text-slate-700 font-bold">{c.nextClass}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action & Alerts Panel */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Grading Deadline</h3>
              <p className="text-indigo-100 text-sm mb-6">Internal marks for Semester I must be submitted by Friday.</p>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl mb-4 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                  4d
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-indigo-200">Time Remaining</p>
                  <p className="text-sm font-bold">Submit by May 12</p>
                </div>
              </div>
              <button onClick={() => toast.info('Opening marksheet...')} className="w-full py-3 bg-white text-indigo-600 font-black rounded-xl text-sm hover:bg-indigo-50 transition-all">
                Enter Grades Now
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <ClipboardList size={140} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" /> Today&apos;s Sessions
            </h3>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", course: "SWE312", room: "Block C, L3", type: "Lecture" },
                { time: "11:30 AM", course: "DS401", room: "Computer Lab 2", type: "Practical" },
                { time: "02:00 PM", course: "Office Hours", room: "Faculty Wing B", type: "Consultation" },
              ].map((session, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="min-w-[70px] text-[10px] font-black text-indigo-600 uppercase pt-1">
                    {session.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{session.course}</p>
                    <p className="text-[11px] text-slate-500">{session.room} · {session.type}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 animate-pulse" />
                </div>
              ))}
            </div>
            <button onClick={() => toast.info('Loading full timetable...')} className="w-full mt-6 py-2 text-xs font-bold text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors">
              View Weekly Timetable
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Grading Guidelines
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600">CW counts for 40% of final grade.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600">Minimum 75% attendance for exam eligibility.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-600">Moderation required for all A+ and F grades.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
