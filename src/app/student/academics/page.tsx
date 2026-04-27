"use client";

import { useState } from "react";
import { FileText, BookOpen, Clock, History, Search, PlusCircle, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HAS_BALANCE = true;

const student = {
  cgpa: 4.25,
  credits_earned: 86,
  credits_remaining: 34,
  programme: "BSc Software Engineering",
  year_of_study: 3,
};

const allPrograms = [
  "BSc. Software Engineering", "BSc. Computer Science", "Bachelor of Information Technology",
  "BSc. Data Science & AI", "BBA. Accounting & Finance", "BBA. Procurement & Logistics",
  "BBA. Human Resource Management", "BBA. Banking & Finance", "BBA. Entrepreneurship",
  "Bachelor of Economics & Statistics", "Bachelor of Laws (LLB)", "BA. International Relations & Diplomacy",
  "BA. Public Administration & Management", "Bachelor of Journalism & Mass Comm", "BSc. Public Health",
  "BSc. Environmental Health Science", "Diploma in Computer Science & IT", "Diploma in Paralegal Studies",
  "Master of Information Technology", "Master of Business Administration",
];

const myModules = [
  { code: "SWE311", name: "Software Architecture",       credits: 4, status: "Active" },
  { code: "SWE312", name: "Database Systems",            credits: 3, status: "Active" },
  { code: "SWE313", name: "Web Engineering",             credits: 4, status: "Active" },
  { code: "SWE314", name: "Computer Networks",           credits: 3, status: "Pending" },
  { code: "SWE315", name: "Operating Systems",           credits: 3, status: "Active" },
  { code: "SWE316", name: "Algorithms & Complexity",     credits: 4, status: "Active" },
];

const gradeColor = (grade: string | null) => {
  if (!grade) return "text-slate-400";
  if (["A", "A+", "A-"].includes(grade)) return "text-finance-success";
  if (["B", "B+", "B-"].includes(grade)) return "text-primary";
  if (["C", "C+", "C-"].includes(grade)) return "text-exam-warning";
  return "text-error";
};

const historicalEnrollments: Record<string, { id: number; grade: string; courses: { code: string; title: string; credits: number } }[]> = {
  "2023/2024 — Semester 1": [
    { id: 1, grade: "A",  courses: { code: "SWE311", title: "Software Architecture",   credits: 4 } },
    { id: 2, grade: "B+", courses: { code: "SWE312", title: "Database Systems",        credits: 3 } },
    { id: 3, grade: "A-", courses: { code: "SWE313", title: "Web Engineering",         credits: 4 } },
  ],
  "2022/2023 — Semester 2": [
    { id: 4, grade: "A",  courses: { code: "SWE221", title: "Object Oriented Programming", credits: 4 } },
    { id: 5, grade: "B",  courses: { code: "SWE222", title: "Data Structures",             credits: 3 } },
    { id: 6, grade: "C+", courses: { code: "SWE223", title: "Computer Networks",           credits: 3 } },
  ],
};

const semesterKeys = Object.keys(historicalEnrollments).sort().reverse();

type TabId = "enrollment" | "history";

export default function StudentAcademics() {
  const [activeTab, setActiveTab] = useState<TabId>("enrollment");
  const [search, setSearch] = useState("");

  const filteredPrograms = allPrograms.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="w-full pb-12">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-on-surface">Academic Performance</h1>
        <p className="text-sm text-on-surface-variant mt-1">{student.programme}</p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">Cumulative GPA</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary">{student.cgpa.toFixed(2)}</span>
                <span className="text-2xl font-bold text-on-surface-variant">/ 5.0</span>
              </div>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {student.cgpa >= 4.5 ? "FIRST CLASS" : student.cgpa >= 3.5 ? "SECOND UPPER" : student.cgpa >= 2.4 ? "SECOND LOWER" : "PASS"}
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${(student.cgpa / 5.0) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs font-medium text-on-surface-variant mt-2">
            <span>OVERALL PERFORMANCE</span>
            <span>{Math.round((student.cgpa / 5.0) * 100)}%</span>
          </div>
        </section>

        <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <BookOpen className="text-sis-accent mb-3" size={32} />
          <span className="block text-4xl font-black">{student.credits_earned}</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mt-1">Credits Earned</span>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <Clock className="text-exam-warning mb-3" size={32} />
          <span className="block text-4xl font-black">{student.credits_remaining}</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mt-1">Credits Remaining</span>
        </div>
      </div>

      {/* ── Exam Timetable Card ── */}
      <section className="bg-primary text-white rounded-xl p-6 mb-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <FileText size={32} />
          <div>
            <p className="font-bold text-lg">Exam Timetable</p>
            <p className="text-white/70 text-sm">Download your personalised exam schedule</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => toast.success("Exam timetable PDF downloading...")}
            className="px-4 py-2 bg-white text-primary font-bold text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download size={16} /> Download PDF
          </button>
          <div className="flex items-center gap-1">
            <History className="text-white/60" size={18} />
            <span className="text-white/60 text-xs">Nov 15</span>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-surface-container-low rounded-xl p-1 w-fit mb-8">
        {(["enrollment", "history"] as TabId[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab === "enrollment" ? "Current Enrollment" : "Grade History"}
          </button>
        ))}
      </div>

      {/* ── Enrollment Tab ── */}
      {activeTab === "enrollment" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Programs */}
          <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-on-surface mb-1">Available Programs</h3>
            <p className="text-xs text-on-surface-variant mb-4">Browse University programs across all faculties</p>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
              {filteredPrograms.map(p => (
                <div
                  key={p}
                  onClick={() => toast.info(`${p} — added to wishlist`)}
                  className="p-3 bg-surface-container-low rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer group flex items-center justify-between"
                >
                  <span className="text-xs font-semibold">{p}</span>
                  <PlusCircle size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}
              {filteredPrograms.length === 0 && (
                <p className="text-sm text-on-surface-variant text-center py-8">No programs found.</p>
              )}
            </div>
          </div>

          {/* Registered Modules */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-border-subtle gap-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">My Registered Modules</h3>
                  <p className="text-sm text-on-surface-variant">Year {student.year_of_study} Semester 1 · Current Enrollment</p>
                </div>
                <button
                  onClick={() => toast.success("Downloading course timetable...")}
                  className="px-4 py-2 border border-border-subtle text-on-surface rounded-xl font-bold text-xs hover:bg-surface-container-low transition-colors flex items-center gap-2"
                >
                  <Download size={14} /> Download Timetable
                </button>
              </div>

              {/* Financial Gate Banner */}
              {HAS_BALANCE && (
                <div className="mx-6 my-4 p-4 bg-error/5 border border-error/20 rounded-xl flex items-start gap-3">
                  <AlertTriangle size={18} className="text-error shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-error">Exam Registration Blocked</p>
                    <p className="text-xs text-error/80 mt-0.5">Clear your outstanding balance to register for examinations.</p>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/50 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Module Code</th>
                      <th className="px-6 py-4">Module Name</th>
                      <th className="px-6 py-4 text-center">Credits</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {myModules.map(m => (
                      <tr key={m.code} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-mono font-bold text-primary text-sm">{m.code}</td>
                        <td className="px-6 py-4 font-medium text-on-surface text-sm">{m.name}</td>
                        <td className="px-6 py-4 text-center font-bold text-on-surface-variant text-sm">{m.credits}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            m.status === "Active" ? "bg-finance-success/10 text-finance-success" : "bg-exam-warning/10 text-exam-warning"
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative inline-block group/btn">
                            <button
                              disabled={HAS_BALANCE}
                              onClick={() => toast.success(`Registered for ${m.code} examinations!`)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                HAS_BALANCE
                                  ? "bg-surface-container text-on-surface-variant cursor-not-allowed"
                                  : "bg-primary text-white hover:opacity-90 shadow-sm"
                              }`}
                            >
                              {HAS_BALANCE ? <><AlertTriangle size={12} className="inline mr-1" />Blocked</> : <><CheckCircle size={12} className="inline mr-1" />Register for Exams</>}
                            </button>
                            {HAS_BALANCE && (
                              <div className="absolute bottom-full right-0 mb-2 w-48 hidden group-hover/btn:block bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl z-50">
                                Clear outstanding balance to register for exams.
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Specialisation Note */}
            <div className="bg-[#00174b] rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Systems Analysis &amp; Database Focus</h4>
                <p className="text-blue-100 text-sm">
                  Your current enrollment is optimized for the SDLC Design Phase. Modules like <strong>SWE311</strong> and <strong>SWE312</strong> directly support your work on Relational Schemas and Prototype Logic.
                </p>
              </div>
              <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
            </div>
          </div>
        </div>
      )}

      {/* ── Grade History Tab ── */}
      {activeTab === "history" && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesterKeys.map(key => (
            <div key={key} className="bg-white rounded-xl overflow-hidden border border-border-subtle shadow-sm">
              <div className="bg-surface-container-low px-6 py-3 border-b border-border-subtle flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{key}</h3>
                <span className="text-xs font-bold text-slate-500">
                  {historicalEnrollments[key]?.length} COURSES
                </span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {historicalEnrollments[key]?.map(enr => (
                    <tr key={enr.id}>
                      <td className="px-6 py-3">
                        <p className="text-sm font-semibold text-slate-800">{enr.courses?.code}</p>
                        <p className="text-xs text-slate-500">{enr.courses?.title}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-600">{enr.courses?.credits}</td>
                      <td className={`px-6 py-3 text-right font-black text-lg ${gradeColor(enr.grade)}`}>
                        {enr.grade ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
