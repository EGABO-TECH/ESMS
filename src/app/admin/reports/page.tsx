"use client";

import { BarChart, FileText, Download, Filter, Search, TrendingUp, TrendingDown, Users, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminReportsPage() {
  const reports = [
    { id: 1, title: "Semester I Financial Audit", category: "Finance", date: "Oct 24, 2025", size: "2.4 MB", type: "PDF" },
    { id: 2, title: "Academic Performance Summary", category: "Academics", date: "Oct 20, 2025", size: "1.1 MB", type: "XLSX" },
    { id: 3, title: "Student Retention Rate Q3", category: "Registry", date: "Oct 15, 2025", size: "850 KB", type: "PDF" },
    { id: 4, title: "Staff Payroll & Allowances", category: "HR", date: "Oct 12, 2025", size: "1.8 MB", type: "PDF" },
    { id: 5, title: "New Admissions Demographics", category: "Admissions", date: "Oct 08, 2025", size: "3.2 MB", type: "CSV" },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Institutional Reports</h1>
          <p className="text-slate-500 mt-1">Generate and download comprehensive data analytics for all departments.</p>
        </div>
        <button onClick={() => toast.info('Opening report builder...')} className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
          <FileText size={18} /> Generate Custom Report
        </button>
      </div>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Enrolment Growth</span>
          </div>
          <p className="text-3xl font-black text-slate-900">+12.4%</p>
          <p className="text-xs text-emerald-500 font-bold mt-1">↑ Above annual target</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <TrendingDown size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Operating Costs</span>
          </div>
          <p className="text-3xl font-black text-slate-900">-4.8%</p>
          <p className="text-xs text-emerald-500 font-bold mt-1">↓ Efficient resource management</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Graduation Rate</span>
          </div>
          <p className="text-3xl font-black text-slate-900">88.2%</p>
          <p className="text-xs text-blue-600 font-bold mt-1">→ Consistent with last year</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Report List */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-bold text-slate-900">Recent Generated Reports</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search reports..." />
              </div>
              <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size/Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{report.title}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{report.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-700">{report.size}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{report.type}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => toast.success(`Downloading ${report.title}...`)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart size={18} className="text-primary" /> Report Templates
            </h3>
            <div className="space-y-3">
              {[
                { title: "Financial Statements", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
                { title: "Academic Audit", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50" },
                { title: "Registry & Records", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
                { title: "Course Curriculum", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
              ].map((cat, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center`}>
                      <cat.icon size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{cat.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">Automated Exports</h3>
              <p className="text-white/70 text-xs mb-6">Schedule weekly or monthly reports to be sent directly to your inbox.</p>
              <button onClick={() => toast.info('Configuring schedule...')} className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-colors border border-white/20">
                Setup Schedule
              </button>
            </div>
            <BarChart size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
