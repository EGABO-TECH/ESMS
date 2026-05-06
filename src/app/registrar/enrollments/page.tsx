"use client";

import { useState } from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { UserPlus, Search, Filter, CheckCircle, Clock, X, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function RegistrarEnrollmentsPage() {
  const { students, courses, studentResults, enrollStudentInCourse } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // Only consider students who are "Enrolled" as admitted
  const admittedStudents = students.filter(s => s.status === "Enrolled" || s.status === "Admitted");
  const filteredStudents = admittedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setSelectedCourse("");
    setIsModalOpen(true);
  };

  const handleEnroll = () => {
    if (!selectedStudent || !selectedCourse) return;
    enrollStudentInCourse(selectedStudent.id, selectedCourse);
    toast.success(`${selectedStudent.name} enrolled successfully!`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Enrollment Hub</h1>
        <p className="text-slate-500 mt-1">Enroll admitted students into new subjects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "New Requests", val: "24", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Approval", val: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Target Rate", val: "92%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-slate-900">Admitted Students</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="Search students..." 
              />
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subjects</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s, i) => {
                const subjectCount = studentResults.filter(r => r.studentId === s.id).length;
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">{s.program}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase tracking-wider">Admitted</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {subjectCount} {subjectCount === 1 ? 'Subject' : 'Subjects'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleOpenModal(s)}
                        className="text-[11px] font-bold text-blue-600 hover:underline flex items-center justify-end gap-1 ml-auto"
                      >
                        <BookOpen size={14} />
                        Enroll Subjects
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No admitted students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Enroll Subject</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{selectedStudent.name}</p>
                    <p className="text-[10px] text-slate-500">{selectedStudent.id}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Course</label>
                <select 
                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">-- Choose a Course --</option>
                  {courses.map(course => {
                    const isEnrolled = studentResults.some(r => r.studentId === selectedStudent.id && r.code === course.code);
                    return (
                      <option key={course.code} value={course.code} disabled={isEnrolled}>
                        {course.code} - {course.name} {isEnrolled ? "(Already Enrolled)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnroll}
                disabled={!selectedCourse}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enroll Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
