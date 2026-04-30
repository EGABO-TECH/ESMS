"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, BookOpen, Clock, History, Search, PlusCircle, Download, AlertTriangle, CheckCircle, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TimetableGrid from "@/components/TimetableGrid";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HAS_BALANCE = true;

const allPrograms = [
  "B.Sc. Software Engineering", "B.Sc. Computer Science", "B.Sc. Data Science & AI", "B.Sc. Information Technology",
  "Bachelor of Laws (LLB)", "Master of Laws (LLM)",
  "BBA - Accounting & Finance", "BBA - Procurement & Logistics", "MBA (All Specializations)",
  "B.Sc. Public Health", "B.Sc. Environmental Health",
  "B.A. International Relations", "B.A. Mass Comm & Journalism",
  "Higher Education Cert (HEC)"
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

type TabId = "enrollment" | "history" | "timetable";

export default function StudentAcademics() {
  const router = useRouter();
  const { students, courses } = useGlobalContext();
  const rawStudent = students[0];

  const student = {
    cgpa: 4.25,
    credits_earned: 86,
    credits_remaining: 34,
    programme: rawStudent.program,
    year_of_study: Number(rawStudent.year),
  };

  const myModules = courses.slice(0, 4).map(c => ({
    code: c.code,
    name: c.name,
    credits: c.credits,
    status: c.status === "Active" ? "Active" : "Pending",
  }));

  const [activeTab, setActiveTab] = useState<TabId>("enrollment");
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const filteredPrograms = allPrograms.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  // Program description map (abbreviated)
  const programDescriptions: Record<string, string> = {
    "B.Sc. Software Engineering": "Covers software design, architecture, testing, and modern full-stack development. Graduates work as engineers, architects, and CTOs.",
    "B.Sc. Computer Science": "Theoretical and applied computing — algorithms, AI, systems programming, and research. Ideal for those pursuing postgraduate studies.",
    "B.Sc. Data Science & AI": "Machine learning, big data analytics, neural networks, and statistical modelling. One of the most sought-after degrees globally.",
    "Bachelor of Laws (LLB)": "Comprehensive legal training covering civil, criminal, commercial, and international law.",
    "BBA - Accounting & Finance": "Financial accounting, audit, tax, and corporate finance aligned with ICPAU and ACCA standards.",
    "MBA (All Specializations)": "Executive management programme with specialisations in Finance, HR, Marketing, and Operations.",
  };

  const handleDownloadTimetable = () => {
    const doc = new jsPDF();
    const studentName = rawStudent.name;
    const studentID = rawStudent.id;
    const date = new Date().toLocaleDateString();

    // -- Header Section --
    doc.setFillColor(0, 23, 75); // CUU Dark Blue (#00174b)
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CAVENDISH UNIVERSITY UGANDA", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Personalised Examination Timetable", 105, 30, { align: "center" });

    // -- Student Info Section --
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("STUDENT DETAILS", 14, 50);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 52, 196, 52);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${studentName}`, 14, 60);
    doc.text(`Student ID: ${studentID}`, 14, 66);
    doc.text(`Programme: ${student.programme}`, 14, 72);
    doc.text(`Academic Year: 2025/2026`, 140, 60);
    doc.text(`Semester: Semester I`, 140, 66);
    doc.text(`Issue Date: ${date}`, 140, 72);

    // -- Timetable Table --
    const tableData = myModules.map((m, i) => [
      m.code,
      m.name,
      `Dec ${15 + i}, 2025`,
      i % 2 === 0 ? "09:00 AM" : "02:00 PM",
      "Main Campus Hall A"
    ]);

    autoTable(doc, {
      startY: 85,
      head: [["CODE", "COURSE TITLE", "DATE", "TIME", "VENUE"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 23, 75], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 35 }
      }
    });

    // -- Footer --
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Note: Please present this timetable along with your University ID and Exam Permit to gain entry into the examination hall.", 14, finalY + 15);
    doc.text("Generated by CUU Student Portal. Official document.", 14, finalY + 20);

    // Save
    doc.save(`Exam_Timetable_${studentID}.pdf`);
    toast.success("Exam timetable downloaded successfully.");
  };

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
            onClick={handleDownloadTimetable}
            className="px-4 py-2 bg-white text-primary font-bold text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 active:scale-95 shadow-sm"
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
        {(["enrollment", "history", "timetable"] as TabId[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab === "enrollment" ? "Current Enrollment" : tab === "history" ? "Grade History" : "Weekly Timetable"}
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
                  onClick={() => setSelectedProgram(p)}
                  className="p-3 bg-surface-container-low rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer group flex items-center justify-between"
                >
                  <span className="text-xs font-semibold">{p}</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                          <button
                            onClick={() => {
                              if (HAS_BALANCE) {
                                router.push("/student/finance");
                              } else {
                                toast.success(`Registered for ${m.code} examinations!`);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                              HAS_BALANCE
                                ? "bg-error/10 text-error hover:bg-error/20"
                                : "bg-primary text-white hover:opacity-90 shadow-sm"
                            }`}
                          >
                            {HAS_BALANCE
                              ? <><AlertTriangle size={12} className="inline mr-1" />Clear Balance</>
                              : <><CheckCircle size={12} className="inline mr-1" />Register for Exams</>}
                          </button>
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
                <h4 className="text-lg font-bold mb-2">Modern App Development Focus</h4>
                <p className="text-blue-100 text-sm">
                  Your current enrollment is optimized for full-stack engineering. Modules like <strong>SWE311</strong> and <strong>SWE313</strong> directly support your work on scalable applications and infrastructure.
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
      {/* ── Timetable Tab ── */}
      {activeTab === "timetable" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TimetableGrid 
            filterType="program" 
            filterValue={student.programme.split('(').pop()?.replace(')', '') || 'BSE'} 
          />
        </div>
      )}

      {/* ── Program Detail Modal ─────────────────────────────── */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProgram(null)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#00174b] p-6 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Programme Details</p>
                  <h3 className="text-xl font-bold leading-tight">{selectedProgram}</h3>
                  <p className="text-blue-200 text-xs mt-1">Cavendish University Uganda</p>
                </div>
                <button onClick={() => setSelectedProgram(null)} className="text-white/70 hover:text-white shrink-0">
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-5">
              {/* Description */}
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">About This Programme</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {programDescriptions[selectedProgram] ||
                    "This programme is offered by Cavendish University Uganda and prepares students with the knowledge and skills required in their respective professional field. Contact the Admissions Office for the full prospectus."}
                </p>
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-sm font-bold text-on-surface">
                    {selectedProgram.startsWith("MBA") || selectedProgram.startsWith("Master") ? "2 Years" :
                     selectedProgram.startsWith("Higher") ? "1 Year" : "3–4 Years"}
                  </p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-wider mb-1">Mode</p>
                  <p className="text-sm font-bold text-on-surface">Full-time / Part-time</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-wider mb-1">Accreditation</p>
                  <p className="text-sm font-bold text-on-surface">NCHE Uganda</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-wider mb-1">Campus</p>
                  <p className="text-sm font-bold text-on-surface">Main Campus</p>
                </div>
              </div>

              {/* Note about current enrolment */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-primary font-medium">
                <span className="font-black">Note:</span> To change your registered programme, contact the Academic Registrar with a formal request letter and your student ID.
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setSelectedProgram(null); toast.success("Programme details saved to your wishlist."); }}
                  className="flex-1 py-3 bg-[#00174b] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle size={16} /> Add to Wishlist
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-3 bg-surface-container-low text-on-surface font-bold rounded-xl text-sm hover:bg-surface-container transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
