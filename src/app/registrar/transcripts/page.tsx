"use client";

import { FileText, Search, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function RegistrarTranscriptsPage() {
  const requests = [
    { id: "TR-9012", name: "Sande Sula", type: "Official", status: "In Progress", date: "2025-10-25" },
    { id: "TR-9013", name: "Sarah Nakato", type: "Unofficial", status: "Ready", date: "2025-10-26" },
    { id: "TR-9014", name: "James Okello", type: "Official", status: "Verified", date: "2025-10-27" },
    { id: "TR-9015", name: "Alice Nabirye", type: "Official", status: "Pending Payment", date: "2025-10-27" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Transcript Services</h1>
          <p className="text-slate-500 mt-1">Processing and issuance of official and unofficial academic transcripts.</p>
        </div>
        <button onClick={() => toast.success('New request submitted')} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
          <FileText size={18} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pending Requests", val: "42", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Verified This Week", val: "128", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Unpaid Requests", val: "15", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.val}</p>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-slate-900">Active Request Queue</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search requests..." />
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-400">{r.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{r.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Requested: {r.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{r.type}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      r.status === 'Ready' || r.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 
                      r.status === 'Pending Payment' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {r.status}
                    </span>
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
