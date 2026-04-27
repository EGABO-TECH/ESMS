"use client";

import { Banknote, TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from "lucide-react";
import { toast } from "sonner";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function FinanceDashboard() {
  const { stats, transactions } = useGlobalContext();
  const { totalCollected, collectionRate, availableFunds, outstandingFees } = stats;

  const summaryStats = [
    { title: "Total Revenue", value: `UGX ${(totalCollected / 1_000_000_000).toFixed(1)}B`, icon: Banknote, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+15% vs last sem" },
    { title: "Outstanding Fees", value: `UGX ${(outstandingFees / 1_000_000).toFixed(0)}M`, icon: DollarSign, color: "text-red-600", bg: "bg-red-50", trend: "14% of Total Invoiced" },
    { title: "Fee Collection Rate", value: `${collectionRate}%`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", trend: "Target: 95%" },
    { title: "Available Funds", value: `UGX ${(availableFunds / 1_000_000_000).toFixed(1)}B`, icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50", trend: "Operating Capital" },
  ];

  const recentTransactions = transactions.slice(0, 4);


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Finance Dashboard</h1>
          <p className="text-slate-500 mt-1">Institutional Financial Health & Collections</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Reconciliation report generated')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={16} /> Export Ledgers
          </button>
          <button onClick={() => toast.info('Opening payment recording form...')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">
            Record New Payment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                stat.title.includes('Outstanding') ? 'text-red-400' : 'text-emerald-400'
              }`}>Financial Unit</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-slate-400">
              {stat.trend.startsWith('+') ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Transactions Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 w-48" placeholder="Search Txn ID..." />
              </div>
              <button onClick={() => alert('Feature in development...')}  className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600">
                <Filter size={14} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Txn ID</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-400">{t.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm">{t.student}</p>
                      <p className="text-[10px] text-slate-400">{t.date}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-emerald-700">{t.amount}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{t.method}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        t.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Progress Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Fee Collection Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500 uppercase">General Tuition</span>
                  <span className="text-emerald-600">88%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500 uppercase">Exam Fees</span>
                  <span className="text-blue-600">72%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500 uppercase">Library & IT</span>
                  <span className="text-amber-600">64%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="text-xs font-bold text-emerald-800">Financial Tip</p>
              <p className="text-[11px] text-emerald-600 mt-1">Collections are up 4% compared to this date last semester. Automated MoMo reminders are performing well.</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="font-bold mb-2">System Reconciler</h3>
            <p className="text-slate-400 text-xs mb-4">Automatically match bank statements with student ledgers.</p>
            <button onClick={() => alert('Feature in development...')}  className="w-full py-3 bg-emerald-500 text-white font-black rounded-xl text-sm hover:bg-emerald-600 transition-all shadow-lg">
              Start Auto-Reconcile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
