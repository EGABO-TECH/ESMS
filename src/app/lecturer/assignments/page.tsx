"use client";

import { ClipboardList, Plus, Search, CheckCircle, Users } from "lucide-react";
import { toast } from "sonner";

export default function LecturerAssignmentsPage() {
  const assignments = [
    { id: 1, title: "System Design Proposal", course: "SWE313", dueDate: "2025-11-05", submissions: 42, total: 45, status: "Active" },
    { id: 2, title: "React Hooks Lab", course: "BIT201", dueDate: "2025-10-30", submissions: 38, total: 40, status: "Closing Soon" },
    { id: 3, title: "Mid-Sem Take Home", course: "BCS101", dueDate: "2025-10-25", submissions: 120, total: 120, status: "Grading" },
    { id: 4, title: "Final Project Draft", course: "SWE422", dueDate: "2025-12-10", submissions: 5, total: 32, status: "Draft" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Assignment Manager</h1>
          <p className="text-slate-500 mt-1">Create, track, and grade student submissions across your active courses.</p>
        </div>
        <button onClick={() => toast.success('Opening assignment builder...')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
          <Plus size={18} /> New Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pending Grading", val: "154", icon: ClipboardList, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active Submissions", val: "286", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Class Score", val: "74%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Current Assignments</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search assignments..." />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Submissions</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.map((asgn) => (
                <tr key={asgn.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{asgn.title}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Points: 100</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-indigo-600">{asgn.course}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{new Date(asgn.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center">
                      <p className="text-xs font-bold text-slate-700">{asgn.submissions}/{asgn.total}</p>
                      <div className="w-20 bg-slate-100 h-1 rounded-full mt-1">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(asgn.submissions/asgn.total)*100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${
                      asgn.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      asgn.status === 'Closing Soon' ? 'bg-amber-100 text-amber-700' : 
                      asgn.status === 'Grading' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {asgn.status}
                    </span>
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
