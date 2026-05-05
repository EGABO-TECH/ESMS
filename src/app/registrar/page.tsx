"use client";

import { Users, BookOpen, GraduationCap, TrendingUp, CheckCircle, Clock, ArrowRight, Plus, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistrarDashboard() {
  const { stats, students, courses, studentResults, deleteStudent, deleteCourse } = useGlobalContext();
  const { totalStudents } = stats;

  const activeCourses = courses.filter(c => c.status === "Active").length;

  const registrarStats = [
    { title: "Student Population",  value: totalStudents.toLocaleString(), icon: Users,          color: "text-blue-600",   bg: "bg-blue-50",   trend: "Active Enrollments"  },
    { title: "Active Courses",       value: activeCourses.toString(),        icon: BookOpen,       color: "text-emerald-600", bg: "bg-emerald-50", trend: `${courses.length} Total in Catalog` },
    { title: "Graduation Apps",      value: "156",                           icon: GraduationCap,  color: "text-amber-600",  bg: "bg-amber-50",  trend: "Class of 2025"        },
    { title: "Record Integrity",     value: "99.8%",                         icon: TrendingUp,     color: "text-indigo-600", bg: "bg-indigo-50", trend: "System Audit: Clean"  },
  ];

  const recentStudents = students.slice(0, 5).map(s => ({
    id: s.id.split('-').slice(1).join('-'),
    rawId: s.id,
    name: s.name,
    program: s.program.split(' (')[0],
    year: s.year,
    status: s.status === 'Enrolled' ? 'Active' : s.status
  }));

  // Show the 3 most recently added courses (first in array = newest because we prepend on add)
  const recentCourses = courses.slice(0, 4);

  const downloadEnrolledStudents = () => {
    const enrolled = students.filter(s => s.status === "Enrolled");
    const headers = ["Student ID", "Name", "Program", "Year", "Email"];
    const rows = enrolled.map((s) => [s.id, s.name, s.program, s.year, s.email]);

    const escapeValue = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeValue(String(value))).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `enrolled-students-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Enrolled students report downloaded.");
  };

  const downloadStudentTranscript = (studentName: string) => {
    // We mock the student's results here, but we can just use the global studentResults
    const headers = ["Course Code", "Course Name", "Credits", "Coursework", "Exam", "Total Score", "Grade", "Points"];
    const rows = studentResults.map(r => [
      r.code, r.name, r.credits, r.cw, r.exam, r.score, r.grade, r.gp
    ]);

    const escapeValue = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeValue(value)).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transcript-${studentName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Transcript for ${studentName} downloaded.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Registrar Dashboard</h1>
          <p className="text-slate-500 mt-1">Academic Records &amp; Student Lifecycle Overview</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadEnrolledStudents} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            Generate Report
          </button>
          <Link href="/registrar/students">
            <button className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
              Add New Student <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {registrarStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Status</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-slate-400">
              <CheckCircle size={14} className="text-emerald-500" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Students Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recently Registered Students</h2>
            <Link href="/registrar/students" className="text-blue-600 text-sm font-bold hover:underline">View All Students</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Number</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Year</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentStudents.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
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
                    <td className="px-6 py-4 text-sm text-slate-500">Year {s.year}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          s.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {s.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Are you sure you want to delete ${s.name}?`)) {
                              deleteStudent(s.rawId);
                              toast.success("Student deleted successfully");
                            }
                          }}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
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

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-[#00174b] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Registration Open</h3>
              <p className="text-blue-200 text-sm mb-6">Semester II Enrollment is now active for all faculties.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <Clock size={18} className="text-blue-300" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-300 tracking-wider">Deadline</p>
                    <p className="text-sm font-bold">October 15, 2025</p>
                  </div>
                </div>
                <button onClick={() => alert('Feature in development...')} className="w-full py-3 bg-white text-[#00174b] font-black rounded-xl text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                  Update Registry Policy
                </button>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Users size={180} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-500" /> Pending Approvals
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-blue-800 uppercase tracking-widest">Transcript Request</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">Sande Sula (BSIT)</p>
                  <p className="text-[11px] text-slate-500 mt-1">Payment verified. Ready for seal.</p>
                </div>
                <button 
                  onClick={() => downloadStudentTranscript("Sande Sula")}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Download Script
                </button>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                <p className="text-xs font-black text-amber-800 uppercase tracking-widest">Result Modification</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Dr. Sarah Johnson (SWE312)</p>
                <p className="text-[11px] text-slate-500 mt-1">Correction of exam marks for 3 students.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Courses Section ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Course Catalog</h2>
            <p className="text-slate-400 text-xs mt-0.5">{courses.length} courses registered — showing the {recentCourses.length} most recent</p>
          </div>
          <Link
            href="/registrar/courses"
            className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={15} /> Add Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold text-sm">No courses registered yet.</p>
            <p className="text-xs mt-1">Click &quot;Add Course&quot; to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recentCourses.map((course, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  {/* Code badge */}
                  <div className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-[10px] font-black text-blue-700 uppercase min-w-[64px] text-center">
                    {course.code}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{course.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{course.faculty} · {course.lecturer}</p>
                  </div>
                </div>
                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-right hidden sm:block">
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Credits</p>
                      <p className="font-black text-blue-600">{course.credits} CU</p>
                    </div>
                    <span className={`flex items-center gap-1 font-black text-[10px] uppercase tracking-widest ${
                      course.status === "Active" ? "text-emerald-500" : "text-slate-400"
                    }`}>
                      {course.status === "Active"
                        ? <CheckCircle2 size={13} />
                        : <XCircle size={13} />
                      }
                      {course.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to delete ${course.code}?`)) {
                          deleteCourse(course.code);
                          toast.success("Course deleted successfully");
                        }
                      }}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}

        {courses.length > 4 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
            <Link href="/registrar/courses" className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1">
              View all {courses.length} courses <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
