"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  ClipboardList, 
  ChevronRight,
  MoreVertical,
  CheckCircle,
  FileText,
  Upload,
  ArrowRight
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function LecturerCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { courses: allCourses } = useGlobalContext();

  const courses = allCourses
    .filter(c => searchTerm === "" || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(c => ({
      code: c.code,
      name: c.name,
      students: c.students,
      schedule: c.schedule,
      room: c.room,
      status: c.status,
    }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Academic Portal</span>
            <ChevronRight size={10} />
            <span className="text-indigo-600">My Courses</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Assigned Modules</h1>
          <p className="text-slate-500 mt-1">Manage your teaching load, student lists, and syllabus delivery.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Opening course designer...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <ClipboardList size={18} /> Lesson Planner
          </button>
          <button onClick={() => toast.info('Opening upload portal...')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Upload size={18} /> Upload Material
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search within my courses..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => alert('Feature in development...')}  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={18} /> All Semesters
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {courses.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <div className="p-6 border-b border-slate-50">
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-lg">
                  {c.code}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {c.status === 'Active' ? <CheckCircle size={12} className="text-emerald-500" /> : <Clock size={12} className="text-amber-500" />}
                  {c.status}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{c.name}</h3>
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-500">{c.students} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-500">{c.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-500">Room {c.room}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-4 flex gap-2">
              <button onClick={() => toast.info(`Viewing student list for ${c.code}`)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase rounded-xl hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2">
                <Users size={14} /> Student List
              </button>
              <button onClick={() => toast.info(`Accessing materials for ${c.code}`)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase rounded-xl hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2">
                <FileText size={14} /> Course Material
              </button>
              <button onClick={() => alert('Feature in development...')}  className="px-3 py-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl transition-all shadow-sm">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#00174b] rounded-2xl p-8 text-white relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">Teaching Resources</h2>
          <p className="text-indigo-200 text-sm mb-8 max-w-md">Access institutional teaching guidelines, assessment rubrics, and the academic calendar.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => alert('Feature in development...')}  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all text-left group/btn">
              <p className="text-[10px] font-black uppercase text-indigo-300 mb-1">Guidelines</p>
              <p className="font-bold text-sm flex items-center justify-between">Assessment Policy <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></p>
            </button>
            <button onClick={() => alert('Feature in development...')}  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all text-left group/btn">
              <p className="text-[10px] font-black uppercase text-indigo-300 mb-1">Calendar</p>
              <p className="font-bold text-sm flex items-center justify-between">Academic Dates <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></p>
            </button>
            <button onClick={() => alert('Feature in development...')}  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all text-left group/btn">
              <p className="text-[10px] font-black uppercase text-indigo-300 mb-1">Faculty</p>
              <p className="font-bold text-sm flex items-center justify-between">Member Directory <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></p>
            </button>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-110 transition-transform duration-700 rotate-12">
          <BookOpen size={200} />
        </div>
      </div>
    </div>
  );
}
