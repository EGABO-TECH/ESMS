"use client";

import { Banknote, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, Download, Calendar } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { toast } from "sonner";

export default function AdminFinancePage() {
  const { stats, transactions } = useGlobalContext();
  const { totalInvoiced, totalCollected, collectionRate } = stats;

  const metrics = [
    { label: "Total Revenue", val: `UGX ${(totalInvoiced / 1_000_000).toFixed(1)}M`, icon: Banknote, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Collections", val: `UGX ${(totalCollected / 1_000_000).toFixed(1)}M`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Outstanding", val: `UGX ${((totalInvoiced - totalCollected) / 1_000_000).toFixed(1)}M`, icon: TrendingDown, color: "text-error", bg: "bg-error/5" },
    { label: "Rate", val: `${collectionRate}%`, icon: PieChart, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Financial Oversight</h1>
        <p className="text-slate-500 mt-1">Real-time revenue tracking and fee collection analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${m.bg} ${m.color} group-hover:scale-110 transition-transform`}>
                <m.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{m.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
            <button onClick={() => toast.success('Exporting ledger...')} className="text-primary text-sm font-bold flex items-center gap-2 hover:underline">
              <Download size={16} /> Export Ledger
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.slice(0, 6).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{tx.student}</p>
                      <p className="text-[10px] text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">{tx.id}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900">UGX {tx.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${
                        tx.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2">Revenue Target</h3>
              <p className="text-slate-400 text-sm mb-6">Current semester collection goal is 95%.</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-4xl font-black text-emerald-400">{collectionRate}%</span>
                <span className="text-xs text-slate-500 font-bold">Target: 95%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${collectionRate}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0">
                  MAY 15
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Installment 2 Due</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">60% Clearance required</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs shrink-0">
                  JUN 10
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Exam Permits Open</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">100% Clearance required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
