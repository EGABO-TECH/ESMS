"use client";

import { useState, useMemo } from "react";
import { BarChart, FileText, Download, Search, TrendingUp, Banknote, CreditCard, PieChart } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/exportUtils";

const reports = [
  { id: 1, title: "Monthly Revenue Forecast", category: "Revenue", date: "Oct 27, 2025", type: "CSV" },
  { id: 2, title: "Expenditure Audit Q3", category: "Expenses", date: "Oct 25, 2025", type: "CSV" },
  { id: 3, title: "Fee Collection Efficiency", category: "Collection", date: "Oct 20, 2025", type: "CSV" },
  { id: 4, title: "Outstanding Debtors List", category: "Receivables", date: "Oct 18, 2025", type: "CSV" },
];

export default function FinanceReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDownload = (report: any) => {
    try {
      toast.loading(`Preparing ${report.title}...`);
      // Mocking report data based on title
      const mockData = [{ title: report.title, category: report.category, date: report.date, type: report.type, status: 'Audited' }];
      exportToCSV(mockData, report.title.replace(/\s+/g, '_'));
      toast.dismiss();
      toast.success(`${report.title} downloaded`);
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 mt-1">Access audit trails, revenue analytics, and budgetary compliance reports.</p>
        </div>
        <button 
          onClick={() => {
            toast.promise(new Promise(res => setTimeout(res, 1500)), {
              loading: 'Running multi-factor analysis...',
              success: 'Analysis complete. Dashboard updated.',
              error: 'Analysis failed'
            });
          }} 
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
        >
          <PieChart size={18} /> New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Rev vs Budget", val: "+8.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Burn Rate", val: "UGX 42M/mo", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Audit Status", val: "CLEAN", icon: BarChart, color: "text-indigo-500", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Generated Audits</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 transition-all" 
                placeholder="Search reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{report.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{report.category} · {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-400">{report.type}</span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleDownload(report);
                    }} 
                    className="p-2 text-slate-300 hover:text-emerald-600 active:scale-90 transition-all"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <div className="p-10 text-center text-slate-400 text-sm font-medium">No reports found matching &quot;{searchQuery}&quot;</div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-2">Automated Billing</h3>
            <p className="text-white/70 text-xs mb-6">Schedule monthly statements to be emailed to all student guardians automatically.</p>
            <button 
              onClick={() => {
                toast.promise(new Promise(res => setTimeout(res, 1200)), {
                  loading: 'Saving automation schedule...',
                  success: 'Monthly billing automation active',
                  error: 'Failed to save settings'
                });
              }} 
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              Configure Automation
            </button>
          </div>
          <Banknote size={100} className="absolute -right-4 -bottom-4 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}
