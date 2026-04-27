"use client";

import { BarChart, FileText, Download, Search, Users, GraduationCap, Map } from "lucide-react";
import { toast } from "sonner";

export default function RegistrarReportsPage() {
  const reports = [
    { id: 1, title: "Semester II Enrollment Statistics", category: "Enrollment", date: "Oct 27, 2025", type: "PDF" },
    { id: 2, title: "Student Nationality Distribution", category: "Demographics", date: "Oct 22, 2025", type: "XLSX" },
    { id: 3, title: "Faculty Performance Audit", category: "Academics", date: "Oct 15, 2025", type: "PDF" },
    { id: 4, title: "Graduation Eligibility List", category: "Finalists", date: "Oct 10, 2025", type: "CSV" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Academic Reports</h1>
        <p className="text-slate-500 mt-1">Institutional data summaries for enrollment, academics, and student records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Completion Rate", val: "94.2%", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "New Admissions", val: "+342", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Regional Reach", val: "12 Countries", icon: Map, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Academic Audits</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search records..." />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {reports.map((report) => (
              <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{report.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{report.category} · {report.date}</p>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toast.success('Report download initiated'); }} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#00174b] rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-2">Custom Report Builder</h3>
            <p className="text-blue-200 text-xs mb-6">Create tailor-made datasets for specific institutional audits.</p>
            <button onClick={() => toast.info('Launching builder...')} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all">
              Launch Builder
            </button>
          </div>
          <BarChart size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}
