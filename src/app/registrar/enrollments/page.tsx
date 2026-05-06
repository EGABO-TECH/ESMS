"use client";

import { useState } from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { UserPlus, Search, Filter, CheckCircle, Clock, X, BookOpen, Check } from "lucide-react";
import { downloadAdmissionPDF } from "@/lib/pdfUtils";
import { toast } from "sonner";

export default function RegistrarEnrollmentsPage() {
  const { students, courses, studentResults, enrollStudentInCourse } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Reflect students added in registrar section (Pending) as well as Enrolled/Admitted
  const admittedStudents = students.filter(s => s.status === "Enrolled" || s.status === "Admitted" || s.status === "Pending");
  const filteredStudents = admittedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setSelectedCourses([]);
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (student: typeof students[0]) => {
    try {
      console.log("Generating PDF for:", student.name);
      const subjects = studentResults.filter(r => r.studentId === student.id);
      downloadAdmissionPDF(student, subjects);
      toast.success(`Admission record for ${student.name} is downloading...`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate PDF. Please check the console.");
    }
  };

  const toggleCourse = (courseCode: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseCode) 
        ? prev.filter(c => c !== courseCode) 
        : [...prev, courseCode]
    );
  };

  const handleEnroll = () => {
    if (!selectedStudent || selectedCourses.length === 0) return;
    
    selectedCourses.forEach(courseCode => {
      enrollStudentInCourse(selectedStudent.id, courseCode);
    });
    
    toast.success(`${selectedStudent.name} enrolled in ${selectedCourses.length} subjects successfully!`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Enrollment Hub</h1>
        <p className="text-slate-500 mt-1">Enroll admitted and newly added students into subjects.</p>
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
          <h2 className="text-lg font-bold text-slate-900">Eligible Students</h2>
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
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
                        <div 
                          className="cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => handleDownloadPDF(s)}
                          title="Download Admission PDF"
                        >
                          <p className="text-sm font-bold text-slate-900 border-b border-transparent hover:border-blue-600">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">{s.program}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                        s.status === 'Enrolled' || s.status === 'Admitted' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        {s.status === 'Pending' ? 'New Admission' : 'Admitted'}
                      </span>
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
                        Assign Subjects
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No eligible students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Assign Subjects</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg uppercase">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900">{selectedStudent.name}</p>
                  <p className="text-xs text-slate-500">{selectedStudent.id} • {selectedStudent.program}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Select Subjects to Assign</label>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {courses.map(course => {
                    const isEnrolled = studentResults.some(r => r.studentId === selectedStudent.id && r.code === course.code);
                    const isSelected = selectedCourses.includes(course.code);
                    
                    return (
                      <div 
                        key={course.code}
                        onClick={() => !isEnrolled && toggleCourse(course.code)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isEnrolled 
                            ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
                            : isSelected 
                              ? 'bg-blue-50 border-blue-200 shadow-sm' 
                              : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check size={12} strokeWidth={4} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{course.code}: {course.name}</p>
                            <p className="text-[10px] text-slate-500">{course.faculty} • {course.credits} Credits</p>
                          </div>
                        </div>
                        {isEnrolled && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Already Enrolled</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <p className="text-xs font-bold text-slate-500">
                {selectedCourses.length} {selectedCourses.length === 1 ? 'subject' : 'subjects'} selected
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEnroll}
                  disabled={selectedCourses.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
                >
                  Assign Selected Subjects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
