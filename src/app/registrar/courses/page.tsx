"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Search, Filter, Plus, BookText, GraduationCap, Clock, CheckCircle, XCircle, ChevronRight, MoreVertical } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistrarCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { courses } = useGlobalContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Academic Catalog</h1>
          <p className="text-slate-500 mt-1">Manage institutional course offerings and credit structures.</p>
        </div>
        <button onClick={() => toast.info('Opening course designer...')} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
          <Plus size={18} /> Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Courses", val: courses.length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Faculties", val: "6", icon: BookText, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Avg Credits", val: "4.0", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Syllabus Review", val: "3", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-4 w-fit group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by code or title..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={18} /> Filter Faculties
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-lg border border-blue-100">
                {course.code}
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{course.name}</h3>
            
            <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Faculty</span>
                <span className="text-slate-700 font-medium">{course.faculty}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Lecturer</span>
                <span className="text-slate-700 font-medium">{course.lecturer}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Credits</span>
                <span className="text-blue-600 font-black">{course.credits} CU</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                course.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'
              }`}>
                {course.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {course.status}
              </span>
              <button onClick={() => toast.info(`Opening syllabus for ${course.code}`)} className="text-[11px] font-bold text-blue-600 hover:underline">
                Edit Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
