"use client";

import { FileText, Plus, Search, Filter, Download, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function FinanceBillingPage() {
  const { students } = useGlobalContext();

  const invoices = students.slice(0, 8).map((s, i) => ({
    id: `INV-2025-${1000 + i}`,
    student: s.name,
    amount: 1250000 + (i * 50000),
    due_date: "2025-11-30",
    status: i % 3 === 0 ? 'Paid' : (i % 2 === 0 ? 'Overdue' : 'Pending')
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Student Billing</h1>
          <p className="text-slate-500 mt-1">Generate invoices, manage tuition fees, and track payment deadlines.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Opening bulk invoice generator...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} /> Export Billing
          </button>
          <button onClick={() => toast.success('New invoice draft created')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <Plus size={18} /> Create Invoice
          </button>
        </div>
      </div>

      {/* Billing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Invoiced", val: "UGX 4.2B", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Collection", val: "UGX 840M", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Overdue Amount", val: "UGX 124M", icon: AlertCircle, color: "text-error", bg: "bg-error/5" },
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

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-slate-900">Active Invoices</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search by invoice or student..." />
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{inv.id}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Tuition Fee - Sem II</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{inv.student}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">UGX {inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{new Date(inv.due_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                      inv.status === 'Overdue' ? 'bg-error/10 text-error' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-center">
          <button className="text-xs font-bold text-emerald-600 hover:underline">View All Invoices</button>
        </div>
      </div>
    </div>
  );
}
