"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  BookOpen, Search, Users, Clock, CheckCircle, FileText,
  Upload, X, Save, Download, ClipboardList, Paperclip, ChevronRight, Trash2
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

type UploadedFile = { name: string; size: string; date: string; type: string };
type LessonPlan = Record<string, string>; // weekKey -> topic

const WEEKS = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function LecturerCoursesPage() {
  const { courses: allCourses, students, lessonPlans, setLessonPlans, materials, setMaterials } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals
  const [plannerCourse, setPlannerCourse] = useState<string | null>(null);
  const [materialCourse, setMaterialCourse] = useState<string | null>(null);
  const [studentListCourse, setStudentListCourse] = useState<string | null>(null);

  const [planDraft, setPlanDraft] = useState<LessonPlan>({});

  const courses = allCourses.filter(c =>
    searchTerm === "" ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sync planDraft when opening planner
  useEffect(() => {
    if (plannerCourse) setPlanDraft(lessonPlans[plannerCourse] ?? {});
  }, [plannerCourse, lessonPlans]);

  const saveLessonPlan = () => {
    if (!plannerCourse) return;
    const updated = { ...lessonPlans, [plannerCourse]: planDraft };
    setLessonPlans(updated);
    toast.success(`Lesson plan for ${plannerCourse} saved!`);
    setPlannerCourse(null);
  };

  const downloadLessonPlan = (courseCode: string) => {
    const plan = lessonPlans[courseCode] ?? {};
    const course = allCourses.find(c => c.code === courseCode);
    const lines = [
      `Lesson Plan — ${course?.name ?? courseCode}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      ...WEEKS.map(w => `${w}: ${plan[w] ?? "(Not planned)"}`)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `lesson-plan-${courseCode}.txt`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Lesson plan downloaded.");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!materialCourse) return;
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const newFiles: UploadedFile[] = files.map(f => ({
      name: f.name,
      size: formatBytes(f.size),
      date: new Date().toLocaleDateString("en-GB"),
      type: f.name.split(".").pop()?.toUpperCase() ?? "FILE",
    }));
    setMaterials(prev => ({
      ...prev,
      [materialCourse]: [...(prev[materialCourse] ?? []), ...newFiles],
    }));
    toast.success(`${files.length} file${files.length > 1 ? "s" : ""} uploaded for ${materialCourse}`);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeMaterial = (courseCode: string, fileName: string) => {
    setMaterials(prev => ({
      ...prev,
      [courseCode]: (prev[courseCode] ?? []).filter(f => f.name !== fileName),
    }));
    toast.success("File removed.");
  };

  const simulateDownload = (file: UploadedFile) => {
    const blob = new Blob([`Simulated content for ${file.name}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = file.name; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloading ${file.name}...`);
  };

  const courseStudents = students.slice(0, 30);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Academic Portal</span><ChevronRight size={10} /><span className="text-indigo-600">My Courses</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Assigned Modules</h1>
          <p className="text-slate-500 mt-1">Manage your teaching load, lesson plans, student lists, and course materials.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPlannerCourse(allCourses[0]?.code ?? null)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <ClipboardList size={18} /> Lesson Planner
          </button>
          <button onClick={() => setMaterialCourse(allCourses[0]?.code ?? null)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Upload size={18} /> Upload Material
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Search within my courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm" />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {courses.map((c, i) => {
          const fileCnt = (materials[c.code] ?? []).length;
          const hasPlan = !!(lessonPlans[c.code] && Object.values(lessonPlans[c.code]).some(v => v.trim()));
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="p-6 border-b border-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-lg">{c.code}</div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {c.status === "Active" ? <CheckCircle size={12} className="text-emerald-500" /> : <Clock size={12} className="text-amber-500" />}
                    {c.status}
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{c.name}</h3>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-300" />
                    <span className="text-xs font-bold text-slate-500">{c.students} Students</span>
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
                <div className="mt-3 flex gap-3">
                  {hasPlan && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      <CheckCircle size={10} /> Lesson Plan Saved
                    </span>
                  )}
                  {fileCnt > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      <Paperclip size={10} /> {fileCnt} File{fileCnt !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-slate-50/50 p-4 flex gap-2 flex-wrap">
                <button onClick={() => setStudentListCourse(c.code)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
                  <Users size={14} /> Student List
                </button>
                <button onClick={() => setMaterialCourse(c.code)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
                  <FileText size={14} /> Course Material
                </button>
                <button onClick={() => setPlannerCourse(c.code)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
                  <ClipboardList size={14} /> Lesson Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.xls,.txt,.zip" className="hidden" onChange={handleFileSelect} />

      {/* ── Lesson Planner Modal ── */}
      {plannerCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Lesson Planner</h3>
                <div className="flex items-center gap-3 mt-1">
                  <select value={plannerCourse} onChange={e => setPlannerCourse(e.target.value)}
                    className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1 outline-none">
                    {allCourses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                {lessonPlans[plannerCourse] && (
                  <button onClick={() => downloadLessonPlan(plannerCourse)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download">
                    <Download size={16} />
                  </button>
                )}
                <button onClick={() => setPlannerCourse(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X size={16} /></button>
              </div>
            </div>
            <div className="overflow-y-auto p-6 space-y-3 flex-1">
              <p className="text-xs text-slate-500 mb-4">Enter the weekly topic or activity for each session. Changes are auto-saved to this device.</p>
              {WEEKS.map(week => (
                <div key={week} className="grid grid-cols-[100px_1fr] gap-3 items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{week}</span>
                  <input value={planDraft[week] ?? ""}
                    onChange={e => setPlanDraft(p => ({ ...p, [week]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder={`Topic / activity for ${week}...`} />
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
              <button onClick={() => setPlannerCourse(null)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl">Cancel</button>
              <button onClick={saveLessonPlan} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2">
                <Save size={16} /> Save Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Course Material Modal ── */}
      {materialCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Course Materials</h3>
                <div className="flex items-center gap-3 mt-1">
                  <select value={materialCourse} onChange={e => setMaterialCourse(e.target.value)}
                    className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1 outline-none">
                    {allCourses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setMaterialCourse(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <button onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl p-6 flex flex-col items-center gap-3 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Upload size={22} className="text-indigo-600" />
                </div>
                <p className="font-bold text-slate-700 text-sm">Click to upload files</p>
                <p className="text-xs text-slate-400">PDF, DOC, PPT, XLSX, ZIP · up to 50 MB</p>
              </button>

              {(materials[materialCourse] ?? []).length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  <Paperclip size={28} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-bold">No files uploaded yet.</p>
                  <p className="text-xs mt-1">Upload study notes, slides, or practicals above.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(materials[materialCourse] ?? []).length} file{(materials[materialCourse] ?? []).length !== 1 ? "s" : ""} uploaded</p>
                  {(materials[materialCourse] ?? []).map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-[9px] font-black">{file.type}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{file.name}</p>
                          <p className="text-[10px] text-slate-400">{file.size} · {file.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => simulateDownload(file)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download">
                          <Download size={14} />
                        </button>
                        <button onClick={() => removeMaterial(materialCourse, file.name)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Remove">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setMaterialCourse(null)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Student List Modal ── */}
      {studentListCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Student List</h3>
                <p className="text-xs text-slate-500 mt-0.5">{studentListCourse} · {courseStudents.length} students enrolled</p>
              </div>
              <button onClick={() => setStudentListCourse(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {courseStudents.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-300 w-5">{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black">{s.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{s.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{s.id}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${s.status === "Enrolled" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
              <button onClick={() => {
                const csv = ["#,Student ID,Name,Status", ...courseStudents.map((s, i) => `${i + 1},${s.id},"${s.name}",${s.status}`)].join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob); const a = document.createElement("a");
                a.href = url; a.download = `students-${studentListCourse}.csv`; a.click(); URL.revokeObjectURL(url);
                toast.success("Student list exported.");
              }} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center gap-2">
                <Download size={15} /> Export List
              </button>
              <button onClick={() => setStudentListCourse(null)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
