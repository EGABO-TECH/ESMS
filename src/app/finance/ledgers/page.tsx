"use client";

import { CreditCard, ArrowUpRight, ArrowDownLeft, Search, Filter, Download, Calendar, MoreVertical, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function FinanceLedgersPage() {
  const { transactions } = useGlobalContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">General Ledgers</h1>
          <p className="text-slate-500 mt-1">Detailed record of all financial movements across institutional accounts.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Ledger report generated')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <Download size={18} /> Download CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Reference ID..." />
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
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Ref</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Debit (UGX)</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Credit (UGX)</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx, i) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-900">{new Date(tx.date).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-400 font-mono">#{tx.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-700">{tx.student}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{tx.method}</p>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-slate-400">---</td>
                      <td className="px-6 py-4 text-right text-sm font-black text-emerald-600">
                        {tx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">
                        {(4200000000 + (i * 1250000)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CreditCard size={18} className="text-emerald-600" /> Account Balances
            </h3>
            <div className="space-y-4">
              {[
                { name: "Tuition Collection A/C", bal: "UGX 3.42B", trend: "up" },
                { name: "Operational Expense A/C", bal: "UGX 842.5M", trend: "down" },
                { name: "Scholarship Fund", bal: "UGX 150M", trend: "up" },
              ].map((acc, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-transparent hover:border-emerald-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{acc.name}</p>
                    {acc.trend === 'up' ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownLeft size={14} className="text-error" />}
                  </div>
                  <p className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{acc.bal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">Reconciliation</h3>
              <p className="text-emerald-100 text-xs mb-6">Last synced with bank feeds 14 minutes ago.</p>
              <button onClick={() => toast.success('Reconciliation complete!')} className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors">
                Run Manual Sync
              </button>
            </div>
            <BookOpen size={100} className="absolute -right-4 -bottom-4 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
