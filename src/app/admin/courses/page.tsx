"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  BookText, 
  GraduationCap, 
  Clock, 
  Layout, 
  ChevronRight,
  MoreVertical,
  CheckCircle,
  XCircle
} from "lucide-react";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { courses } = useGlobalContext();

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return courses;
    return courses.filter((course) => 
      course.name.toLowerCase().includes(query) || 
      course.code.toLowerCase().includes(query)
    );
  }, [courses, searchTerm]);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Administration</span>
            <ChevronRight size={10} />
            <span className="text-primary">Curriculum Management</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Academic Courses</h1>
          <p className="text-slate-500 mt-1">Manage institutional syllabus, modules, and credit allocations.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Opening new course form...')} className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Plus size={18} /> Create New Course
          </button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Courses", val: "156", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Faculties", val: "6", icon: Layout, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Avg Credits", val: "3.8", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Review", val: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by course code or title..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => alert('Feature in development...')}  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={18} /> Filter Faculties
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            No courses found matching &quot;{searchTerm}&quot;
          </div>
        ) : filteredCourses.map((course, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/10">
                {course.code}
              </div>
              <button onClick={() => alert('Feature in development...')}  className="text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
            
            <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <BookText size={14} className="text-primary/60" /> Faculty
                </span>
                <span className="text-slate-700 font-medium">{course.faculty}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap size={14} className="text-primary/60" /> Lecturer
                </span>
                <span className="text-slate-700 font-medium">{course.lecturer}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} className="text-primary/60" /> Credit Units
                </span>
                <span className="text-primary font-black">{course.credits} CU</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                course.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'
              }`}>
                {course.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {course.status}
              </span>
              <button onClick={() => toast.info(`Opening syllabus for ${course.code}`)} className="text-[11px] font-bold text-primary hover:underline underline-offset-4">
                View Detailed Syllabus →
              </button>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-700 -rotate-12">
              <BookOpen size={120} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
