"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  ChevronRight,
  ClipboardCheck,
  AlertCircle,
  CheckCircle,
  FileText,
  TrendingUp,
  Download
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function LecturerGradesPage() {
  const [activeCourse, setActiveCourse] = useState("SWE311");
  const { students: rawStudents, courses } = useGlobalContext();

  // Build grading rows from real student data + mock scores
  const mockScores: Record<string, { cw: number; exam: number }> = {
    "CUU-258-154": { cw: 34, exam: 47 },
    "CUU-230-500": { cw: 30, exam: 35 },
    "CUU-273-318": { cw: 32, exam: 44 },
    "CUU-269-896": { cw: 28, exam: 48 },
    "CUU-274-500": { cw: 35, exam: 46 },
  };
  const getGrade = (total: number) => {
    if (total >= 80) return "A";
    if (total >= 75) return "B+";
    if (total >= 70) return "B";
    if (total >= 65) return "C+";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
  };
  const students = rawStudents.map(s => {
    const scores = mockScores[s.id] ?? { cw: 28, exam: 40 };
    const total = scores.cw + scores.exam;
    return { id: s.id.replace("CUU-",""), name: s.name, cw: scores.cw, exam: scores.exam, total, grade: getGrade(total) };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Academic Portal</span>
            <ChevronRight size={10} />
            <span className="text-indigo-600">Grading Center</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Module Grading</h1>
          <p className="text-slate-500 mt-1">Submit internal marks, coursework scores, and examination results.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Marksheet exported for moderation')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export Marksheet
          </button>
          <button onClick={() => toast.success('Final marks submitted to Registry')} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <ClipboardCheck size={18} /> Final Submission
          </button>
        </div>
      </div>

      {/* Course Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {courses.map(c => (
          <button 
            key={c.code}
            onClick={() => setActiveCourse(c.code)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCourse === c.code ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Grading Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              Student Marksheet — {activeCourse}
              {courses.find(c => c.code === activeCourse) && (
                <span className="text-sm font-medium text-slate-400 ml-2">
                  {courses.find(c => c.code === activeCourse)?.name}
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-48" placeholder="Search student..." />
              </div>
              <button onClick={() => alert('Feature in development...')}  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">CW (40)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Exam (60)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total (100)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm">{s.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{s.id}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="number" defaultValue={s.cw} className="w-16 text-center py-1 bg-transparent border-b border-transparent focus:border-indigo-600 focus:bg-indigo-50/50 outline-none text-sm font-bold text-slate-600 transition-all" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="number" defaultValue={s.exam} className="w-16 text-center py-1 bg-transparent border-b border-transparent focus:border-indigo-600 focus:bg-indigo-50/50 outline-none text-sm font-bold text-slate-600 transition-all" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-black text-slate-900">{s.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        s.grade === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => toast.success(`Grades saved for ${s.name}`)} className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all">
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Performance Insights</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Class Average</p>
                  <p className="text-2xl font-black text-slate-900">76.4%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pass Rate</p>
                  <p className="text-2xl font-black text-slate-900">94.2%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
                <AlertCircle size={20} />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Action Needed</p>
                  <p className="text-xs font-bold mt-1">2 students are at risk of failing the module.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#00174b] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Grading Policy</h4>
              <p className="text-blue-200 text-xs mb-6">Ensure all marks comply with the CUU Academic Standards v.2024.</p>
              <button onClick={() => toast.info('Downloading policy document...')} className="w-full py-3 bg-white text-[#00174b] font-black rounded-xl text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                <FileText size={16} /> View Grading Rubric
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
