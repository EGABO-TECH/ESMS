"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronRight,
  ArrowUpDown,
  UserCheck,
  UserPlus,
  Clock,
  History,
  Trash2
} from "lucide-react";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistrarStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { students: rawStudents, deleteStudent } = useGlobalContext();

  const students = useMemo(
    () =>
      rawStudents.map((s) => ({
        id: s.id.replace("CUU-", ""),
        rawId: s.id,
        name: s.name,
        program: s.program.split(" (")[0],
        year: s.year,
        status: s.status === "Enrolled" ? "Active" : s.status,
        intake: s.intake,
        email: s.email,
      })),
    [rawStudents]
  );

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.program.toLowerCase().includes(query)
    );
  }, [searchTerm, students]);

  const downloadCsv = () => {
    const headers = ["Student ID", "Name", "Program", "Year", "Status", "Intake", "Email"];
    const rows = filteredStudents.map((student) => [
      student.id,
      student.name,
      student.program,
      student.year,
      student.status,
      student.intake,
      student.email,
    ]);

    const escapeValue = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeValue(String(value))).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `student-ledger-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Student ledger download started.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Registry</span>
            <ChevronRight size={10} />
            <span className="text-blue-600">Student Management</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Academic Student Records</h1>
          <p className="text-slate-500 mt-1">Official repository for student academic files and registry status.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadCsv} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Official Export
          </button>
          <Link href="/registrar/students/new-admission" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Plus size={18} /> New Admission
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Records", val: "4,892", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "New Registrations", val: "142", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Incomplete Files", val: "24", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
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

      {/* Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by student name or student ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => alert('Feature in development...')}  className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 transition-all">
            <Filter size={18} /> Filter by Intake
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">Student <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Number</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Program</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Year</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intake</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{s.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{s.program}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-400">Y{s.year}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">{s.intake}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toast.info(`Viewing academic file for ${s.id}`)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-[11px] font-black uppercase transition-all">
                        Full File
                      </button>
                      <button onClick={() => alert('Feature in development...')}  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg" title="History">
                        <History size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${s.name}?`)) {
                            deleteStudent(s.rawId);
                            toast.success("Student deleted successfully");
                          }
                        }}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors" 
                        title="Delete Student"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
