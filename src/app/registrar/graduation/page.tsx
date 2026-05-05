"use client";

import { useState, useMemo } from "react";
import { GraduationCap, CheckCircle, Clock, Search, Filter, Download } from "lucide-react";
import { toast } from "sonner";

export default function RegistrarGraduationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const rawFinalists = [
    { name: "Egabo Aaron", program: "Software Engineering", gpa: 4.8, clearance: "Cleared", status: "Ready" },
    { name: "Alimpa Anne", program: "Laws (LLB)", gpa: 4.2, clearance: "Cleared", status: "Ready" },
    { name: "Sande Sula", program: "Data Science", gpa: 3.9, clearance: "Pending Finance", status: "Hold" },
    { name: "Sarah Nakato", program: "Business Admin", gpa: 4.5, clearance: "Cleared", status: "Ready" },
  ];

  const finalists = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return rawFinalists;
    return rawFinalists.filter(f => 
      f.name.toLowerCase().includes(query) || 
      f.program.toLowerCase().includes(query)
    );
  }, [searchTerm, rawFinalists]);

  const downloadCsv = () => {
    const headers = ["Student Name", "Program", "GPA", "Clearance", "Status"];
    const rows = finalists.map((f) => [
      f.name, f.program, f.gpa, f.clearance, f.status
    ]);

    const escapeValue = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeValue).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `graduation-list-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Graduation list downloaded.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Graduation Registry</h1>
          <p className="text-slate-500 mt-1">Final year clearance, degree audits, and graduation ceremony planning.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Graduation list finalized')} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all">
            Finalize List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Expected Graduates", val: "1,248", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Cleared Students", val: "842", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Clearance", val: "406", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
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
          <h2 className="text-lg font-bold text-slate-900">Class of 2025 Finalists</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" 
                placeholder="Search finalists..." 
              />
            </div>
            <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600">
              <Filter size={16} />
            </button>
            <button onClick={downloadCsv} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Program & GPA</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clearance</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {finalists.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">
                    No finalists found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              ) : finalists.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{f.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-slate-600">{f.program}</p>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">GPA: {f.gpa}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-[10px] font-black uppercase ${
                      f.clearance === 'Cleared' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>{f.clearance}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      f.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {f.status}
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
