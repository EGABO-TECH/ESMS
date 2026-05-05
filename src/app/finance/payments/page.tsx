"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Banknote,
  Receipt,
  FileText
} from "lucide-react";

import { useGlobalContext } from "@/lib/GlobalContext";
import { exportToCSV } from "@/lib/exportUtils";

export default function FinancePaymentsPage() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { transactions: payments, verifyTransaction } = useGlobalContext();

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesStatus = filterStatus === "All" || p.status === filterStatus;
      const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.reference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [payments, filterStatus, searchQuery]);

  const handleExport = () => {
    try {
      toast.loading("Exporting payment batch...");
      exportToCSV(filteredPayments, `ESMS_Payments_${filterStatus}_${new Date().toISOString().split('T')[0]}`);
      toast.dismiss();
      toast.success("Payment registry exported");
    } catch (error) {
      toast.error("Failed to export registry");
    }
  };

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
          <button 
            onClick={handleExport} 
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export Batch
          </button>
          <button 
            onClick={() => {
              toast.promise(new Promise(res => setTimeout(res, 2000)), {
                loading: 'Reconciling with Bank API...',
                success: 'All statements matched successfully',
                error: 'Connection error'
              });
            }} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2"
          >
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
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-default group">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.val}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition-all focus:bg-white"
            />
          </div>
          <button 
            onClick={() => toast('Filter by: MTN MoMo, Airtel Money, Bank Transfer')}  
            className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 active:scale-95 transition-all"
          >
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
              {filteredPayments.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {p.id.split('-')[1]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{p.id}</span>
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
                    {p.status !== 'Verified' ? (
                      <button 
                        onClick={() => {
                          verifyTransaction(p.id);
                          toast.success('Transaction receipt sent to student email');
                        }} 
                        className="text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase active:scale-95 transition-all">
                        Confirm
                      </button>
                    ) : (
                      <span className="text-[10px] font-black text-slate-300 uppercase">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm font-medium">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
