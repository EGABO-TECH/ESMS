"use client";

import { PieChart, BarChart2, TrendingUp, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/exportUtils";

export default function FinanceBudgetPage() {
  const budgets = [
    { name: "Academic Resources", allocated: 250000000, spent: 180000000, color: "bg-blue-500" },
    { name: "Infrastructure", allocated: 500000000, spent: 420000000, color: "bg-emerald-500" },
    { name: "Student Services", allocated: 150000000, spent: 90000000, color: "bg-amber-500" },
    { name: "Research & Innovation", allocated: 100000000, spent: 45000000, color: "bg-purple-500" },
  ];

  const handleExport = () => {
    try {
      toast.loading("Exporting budget analysis...");
      exportToCSV(budgets, `ESMS_Budget_Status_${new Date().toISOString().split('T')[0]}`);
      toast.dismiss();
      toast.success("Budget report downloaded");
    } catch (error) {
      toast.error("Export failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Budget Oversight</h1>
          <p className="text-slate-500 mt-1">Departmental allocations, expenditure tracking, and fiscal planning.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport} 
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download size={18} /> Export Data
          </button>
          <button 
            onClick={() => {
              toast.info('Opening budget planner... (Module active)');
            }} 
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <PieChart size={18} /> New Budget Allocation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Annual Budget", val: "UGX 4.8B", icon: BarChart2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Expenditure", val: "UGX 3.1B", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Remaining Balance", val: "UGX 1.7B", icon: PieChart, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-default group">
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BarChart2 size={20} className="text-blue-600" /> Expenditure Analysis
        </h2>
        <div className="space-y-8">
          {budgets.map((b, i) => (
            <div key={i} className="space-y-2 group cursor-help">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{b.name}</p>
                  <p className="text-[11px] text-slate-500">Allocation: UGX {(b.allocated / 1_000_000).toFixed(1)}M</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{Math.round((b.spent / b.allocated) * 100)}%</p>
                  <p className="text-[11px] text-slate-500">Spent: UGX {(b.spent / 1_000_000).toFixed(1)}M</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className={`${b.color} h-full rounded-full transition-all duration-1000 group-hover:brightness-110`} style={{ width: `${(b.spent / b.allocated) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-900">Budget Warning</h3>
          <p className="text-xs text-amber-700 mt-1">Infrastructure spending is at 84% of the quarterly allocation. Further expenditure may require board approval.</p>
        </div>
      </div>
    </div>
  );
}
