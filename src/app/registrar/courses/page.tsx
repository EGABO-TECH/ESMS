"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BookOpen, Search, Filter, Plus, BookText, GraduationCap, Clock,
  CheckCircle, XCircle, MoreVertical, X, AlertCircle,
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

interface NewCourseForm {
  name: string;
  code: string;
  description: string;
  faculty: string;
  credits: string;
  lecturer: string;
}

const EMPTY_FORM: NewCourseForm = {
  name: "",
  code: "",
  description: "",
  faculty: "",
  credits: "",
  lecturer: "",
};

const FACULTY_OPTIONS = [
  "Science & Technology",
  "Business & Management",
  "Law",
  "Social Sciences",
  "Education",
  "Health Sciences",
];

export default function RegistrarCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewCourseForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<NewCourseForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { courses, setCourses } = useGlobalContext();

  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = (): boolean => {
    const newErrors: Partial<NewCourseForm> = {};
    if (!form.name.trim()) newErrors.name = "Course name is required.";
    if (!form.code.trim()) newErrors.code = "Course code is required.";
    else if (courses.some((c) => c.code.toUpperCase() === form.code.trim().toUpperCase()))
      newErrors.code = "This course code already exists.";
    if (!form.description.trim()) newErrors.description = "Course description is required.";
    if (!form.faculty) newErrors.faculty = "Please select a faculty.";
    if (!form.credits.trim() || isNaN(Number(form.credits)) || Number(form.credits) < 1)
      newErrors.credits = "Enter valid credits (e.g. 3 or 4).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate async

    const newCourse = {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      faculty: form.faculty,
      credits: Number(form.credits),
      lecturer: form.lecturer.trim() || "TBA",
      status: "Active" as const,
      students: 0,
      schedule: "TBD",
      room: "TBD",
      progress: 0,
      nextClass: "Not scheduled",
      description: form.description.trim(),
    };

    setCourses((prev) => [newCourse, ...prev]);
    toast.success(`Course "${newCourse.name}" (${newCourse.code}) added successfully!`);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const field = (
    id: keyof NewCourseForm,
    label: string,
    placeholder: string,
    type: "text" | "textarea" | "select" | "number" = "text"
  ) => (
    <div>
      <label htmlFor={id} className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => { setForm((p) => ({ ...p, [id]: e.target.value })); setErrors((p) => ({ ...p, [id]: undefined })); }}
          className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none ${errors[id] ? "border-red-400 bg-red-50" : "border-slate-200"}`}
        />
      ) : type === "select" ? (
        <select
          id={id}
          value={form[id]}
          onChange={(e) => { setForm((p) => ({ ...p, [id]: e.target.value })); setErrors((p) => ({ ...p, [id]: undefined })); }}
          className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all ${errors[id] ? "border-red-400 bg-red-50" : "border-slate-200"}`}
        >
          <option value="">Select faculty...</option>
          {FACULTY_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => { setForm((p) => ({ ...p, [id]: e.target.value })); setErrors((p) => ({ ...p, [id]: undefined })); }}
          className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all ${errors[id] ? "border-red-400 bg-red-50" : "border-slate-200"}`}
        />
      )}
      {errors[id] && (
        <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
          <AlertCircle size={11} /> {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Academic Catalog</h1>
          <p className="text-slate-500 mt-1">Manage institutional course offerings and credit structures.</p>
        </div>
        <button
          id="add-course-btn"
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-[#00174b] text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={18} /> Add New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Courses", val: courses.filter(c => c.status === "Active").length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
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

      {/* Search */}
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

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No courses found</p>
          </div>
        ) : filtered.map((course, i) => (
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
            {"description" in course && (course as {description?: string}).description && (
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">{(course as {description?: string}).description}</p>
            )}
            <div className="space-y-3 mt-4 pt-4 border-t border-slate-50">
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
              <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${course.status === "Active" ? "text-emerald-500" : "text-slate-400"}`}>
                {course.status === "Active" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {course.status}
              </span>
              <button onClick={() => toast.info(`Opening syllabus for ${course.code}`)} className="text-[11px] font-bold text-blue-600 hover:underline">
                Edit Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add Course Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal header */}
            <div className="bg-[#00174b] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Add New Course</h2>
                <p className="text-blue-200 text-xs mt-0.5">Fill in the details to register a new course</p>
              </div>
              <button
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Course Name */}
              {field("name", "Course Name *", "e.g. Introduction to Programming")}

              {/* Course Code */}
              {field("code", "Course Code *", "e.g. SWE101")}

              {/* Description */}
              {field("description", "Course Description *", "Briefly describe what this course covers...", "textarea")}

              {/* Faculty */}
              {field("faculty", "Faculty *", "", "select")}

              {/* Credits & Lecturer side-by-side */}
              <div className="grid grid-cols-2 gap-4">
                {field("credits", "Credits *", "e.g. 4", "number")}
                {field("lecturer", "Lecturer (optional)", "e.g. Dr. John Doe")}
              </div>
            </form>

            {/* Modal footer */}
            <div className="px-8 py-5 border-t border-slate-100 flex gap-3 justify-end bg-slate-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2 disabled:opacity-60 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <><Plus size={16} /> Add Course</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
