"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  Banknote,
  Receipt,
  FileText
} from "lucide-react";

export default function FinancePaymentsPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  const payments = [
    { id: "TXN-8821", student: "Egabo Aaron", amount: "UGX 1,250,000", method: "MTN MoMo", date: "Oct 24, 2025", status: "Verified", reference: "MTN-9921-X" },
    { id: "TXN-8820", student: "Faida Nancy", amount: "UGX 850,000", method: "Stanbic Bank", date: "Oct 24, 2025", status: "Verified", reference: "SB-0021-A" },
    { id: "TXN-8819", student: "Alimpa Anne", amount: "UGX 1,100,000", method: "Airtel Money", date: "Oct 23, 2025", status: "Pending", reference: "ART-1122-B" },
    { id: "TXN-8818", student: "Kirabo Alice", amount: "UGX 1,250,000", method: "Centenary Bank", date: "Oct 23, 2025", status: "Verified", reference: "CB-4455-Q" },
    { id: "TXN-8817", student: "Ababiku Brenda", amount: "UGX 500,000", method: "Cash Deposit", date: "Oct 22, 2025", status: "Review", reference: "CASH-101" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Finance Office</span>
            <ChevronRight size={10} />
            <span className="text-emerald-600">Payment Processing</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Transaction Registry</h1>
          <p className="text-slate-500 mt-1">Review and verify student tuition and fee payments.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Downloading payment reconciliation...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export Batch
          </button>
          <button onClick={() => toast.info('Starting reconciliation...')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Receipt size={18} /> Reconcile Statements
          </button>
        </div>
      </div>

      {/* Finance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Collections", val: "UGX 42M", icon: Banknote, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Verification", val: "14", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Bank Batches", val: "8", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Recon. Status", val: "Matched", icon: CheckCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.val}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
        {["All", "Verified", "Pending", "Review"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              filterStatus === tab 
              ? "bg-emerald-600 text-white shadow-md" 
              : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by student name or Transaction ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
            />
          </div>
          <button className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 transition-all">
            <Filter size={18} /> Filter Method
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method & Reference</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.filter(p => filterStatus === "All" || p.status === filterStatus).map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] border border-emerald-100">
                        {p.id.split('-')[1]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">{p.id}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{p.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-600 text-sm">{p.student}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-emerald-700">{p.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-700">{p.method}</p>
                    <p className="text-[10px] font-mono text-slate-400">{p.reference}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                      p.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                      p.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toast.success('Transaction receipt sent to student email')} className="text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all">
                      Confirm
                    </button>
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
