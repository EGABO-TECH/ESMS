"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  UserCheck, 
  UserMinus, 
  Edit, 
  Trash2,
  ChevronRight,
  ArrowUpDown,
  Mail,
  Phone
} from "lucide-react";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All Programs");

  const { students } = useGlobalContext();
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        query.length === 0 ||
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.program.toLowerCase().includes(query);

      const matchesProgram =
        filterRole === "All Programs" || student.program === filterRole;

      return matchesSearch && matchesProgram;
    });
  }, [students, searchTerm, filterRole]);


  return (
    <>
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Administration</span>
            <ChevronRight size={10} />
            <span className="text-primary">Student Registry</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Student Directory</h1>
          <p className="text-slate-500 mt-1">Manage all registered students across all faculties and campuses.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Exporting student list...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
          <Link href="/admin/students/register" className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Plus size={18} /> Register Student
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or program..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select 
            className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option>All Programs</option>
            <option>Software Engineering</option>
            <option>Data Science & AI</option>
            <option>Business Admin (BBA)</option>
            <option>Laws (LLB)</option>
          </select>
          <button onClick={() => alert('Feature in development...')}  className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    Student Information <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Program & Level</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{student.name}</p>
                        <p className="text-xs font-mono text-slate-400">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-600">{student.program}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Year {student.year} · Sem {student.sem}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      student.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-700' : 
                      student.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail size={12} className="text-primary/60" /> {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone size={12} className="text-primary/60" /> +256 700 000 000
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => toast.info('Opening editor...')} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit Student">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => toast.error('Confirm deletion...')} className="p-2 text-slate-400 hover:text-error hover:bg-error/5 rounded-lg transition-all" title="Delete Student">
                        <Trash2 size={16} />
                      </button>
                      <button onClick={() => alert('Feature in development...')}  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredStudents.length} of {students.length} Students
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>Previous</button>
            <button onClick={() => alert('Feature in development...')}  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">Next Page</button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">Active This Sem</p>
            <p className="text-2xl font-black text-emerald-900">4,102</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">New Admissions</p>
            <p className="text-2xl font-black text-amber-900">790</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
            <UserMinus size={28} />
          </div>
          <div>
            <p className="text-xs font-black text-red-800 uppercase tracking-widest mb-1">Inactive/Withdrawn</p>
            <p className="text-2xl font-black text-red-900">124</p>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
