"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  TrendingUp, 
  Search, 
  Award, 
  FileCheck, 
  AlertTriangle, 
  ChevronRight,
  MoreVertical,
  Download
} from "lucide-react";

import { MOCK_GRADING } from "@/lib/mockData";

export default function AdminGradesPage() {
  const [activeFaculty, setActiveFaculty] = useState("All");

  const gradeStats = [
    { label: "Overall Avg GPA", val: "3.42", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Moderation", val: "24", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Dean's List (A+)", val: "142", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Retake Alerts", val: "48", icon: FileCheck, color: "text-red-600", bg: "bg-red-50" },
  ];

  const classResults = MOCK_GRADING;


  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Administration</span>
            <ChevronRight size={10} />
            <span className="text-primary">Academic Standards</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Grading & Results</h1>
          <p className="text-slate-500 mt-1">Institutional academic performance monitoring and moderation hub.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Downloading global results sheet...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Master Result Sheet
          </button>
        </div>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {gradeStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Sem 1 2025</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.val}</p>
            </div>
            {/* Visual Sparkline Placeholder */}
            <div className="absolute right-0 bottom-0 w-24 h-16 opacity-10 group-hover:opacity-20 transition-all">
              <TrendingUp size={80} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Moderation Controls */}
      <div className="bg-[#00174b] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
            <AlertTriangle className="text-amber-400" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black">Moderation Window Closing</h3>
            <p className="text-blue-200 text-sm mt-1">Final approval for Faculty of Science results must be completed within 48 hours.</p>
          </div>
        </div>
        <button onClick={() => toast.info('Opening moderation dashboard...')} className="relative z-10 bg-white text-[#00174b] px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap">
          Open Moderation Center
        </button>
        <div className="absolute right-0 top-0 w-64 h-full bg-blue-500/10 -skew-x-12 translate-x-32" />
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2">
            {["All", "Science", "Business", "Law"].map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFaculty(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFaculty === f ? "bg-primary text-white shadow-md" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by course..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Module</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Enrolled</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Class Avg</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Lecturer</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classResults.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px] border border-indigo-100">
                        {r.code}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-slate-500">{r.students}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-black ${
                        parseInt(r.avg) > 75 ? "text-emerald-600" : 
                        parseInt(r.avg) > 60 ? "text-blue-600" : "text-amber-600"
                      }`}>{r.avg}</span>
                      <div className="w-12 bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: r.avg }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200" />
                      <span className="text-xs font-medium text-slate-600">{r.lecturer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                      r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      r.status === 'Moderating' ? 'bg-blue-100 text-blue-700' :
                      r.status === 'Review Needed' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => toast.info('Opening class marksheet...')} className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-all" title="View Grades">
                        <Award size={16} />
                      </button>
                      <button onClick={() => alert('Feature in development...')}  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
