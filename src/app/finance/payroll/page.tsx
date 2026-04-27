"use client";

import { Users, Banknote, Clock, Download, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function FinancePayrollPage() {
  const staff = [
    { name: "Dr. James Okello", role: "Professor", dept: "Science", basic: 4500000, allowances: 500000, status: "Paid" },
    { name: "Sarah Nakato", role: "Lecturer", dept: "Arts", basic: 3200000, allowances: 300000, status: "Paid" },
    { name: "Moses Musoke", role: "Admin", dept: "Registry", basic: 2800000, allowances: 200000, status: "Pending" },
    { name: "Dr. Alice Nabirye", role: "Asst. Professor", dept: "Law", basic: 3800000, allowances: 400000, status: "Paid" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Staff Payroll</h1>
          <p className="text-slate-500 mt-1">Manage university staff salaries, allowances, and statutory deductions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Payroll batch processed')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all">
            Process Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Payroll (Net)", val: "UGX 412.5M", icon: Banknote, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Payments", val: "12 Staff", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Staff", val: "148", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-slate-900">Staff Salary List</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search staff..." />
            </div>
            <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600">
              <Filter size={16} />
            </button>
            <button onClick={() => toast.info('Exporting slips...')} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-emerald-600">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role/Dept</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Salary</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staff.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{s.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-slate-600">{s.role}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{s.dept}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">
                    UGX {(s.basic + s.allowances).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      s.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {s.status}
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
