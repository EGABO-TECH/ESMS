"use client";

import { useState, useMemo } from "react";
import { BarChart, FileText, Download, Search, Users, GraduationCap, TrendingUp, X, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function LecturerReportsPage() {
  const { students, studentResults, courses } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [trackerCourse, setTrackerCourse] = useState(courses[0]?.code ?? "");

  // Compute real stats from student results
  const passRate = useMemo(() => {
    if (!studentResults.length) return 91.2;
    const passed = studentResults.filter(r => r.score >= 50).length;
    return Number(((passed / studentResults.length) * 100).toFixed(1));
  }, [studentResults]);

  const avgScore = useMemo(() => {
    if (!studentResults.length) return 68;
    return Number((studentResults.reduce((s, r) => s + r.score, 0) / studentResults.length).toFixed(1));
  }, [studentResults]);

  // Per-student tracker data for selected course
  const trackerRows = useMemo(() => {
    return students.map(s => {
      const result = studentResults.find(r => r.studentId === s.id && r.code === trackerCourse);
      return {
        id: s.id,
        name: s.name,
        cw: result?.cw ?? 0,
        exam: result?.exam ?? 0,
        total: result?.score ?? 0,
        grade: result?.grade ?? "—",
        submitted: !!result,
      };
    }).filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));
  }, [students, studentResults, trackerCourse, search]);

  const trackerStats = useMemo(() => {
    const submitted = trackerRows.filter(r => r.submitted);
    const avg = submitted.length ? submitted.reduce((s, r) => s + r.total, 0) / submitted.length : 0;
    const passing = submitted.filter(r => r.total >= 50).length;
    return { submitted: submitted.length, avg: avg.toFixed(1), passing };
  }, [trackerRows]);

  // Audit reports list (some static, some computed)
  const reports = [
    { id: 1, title: "Semester II Performance Analysis", category: "Academic", date: "Oct 27, 2025", type: "CSV", generator: "performance" },
    { id: 2, title: "Student Mark Summary", category: "Grades", date: new Date().toLocaleDateString("en-GB"), type: "CSV", generator: "marks" },
    { id: 3, title: "Assignment Submission Trends", category: "Engagement", date: "Oct 20, 2025", type: "CSV", generator: "assignments" },
    { id: 4, title: "At-Risk Students Report", category: "Intervention", date: new Date().toLocaleDateString("en-GB"), type: "CSV", generator: "atrisk" },
  ];

  const filteredReports = reports.filter(r =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase())
  );

  const downloadReport = (generator: string, title: string) => {
    let csv = "";

    if (generator === "performance") {
      const header = "Student ID,Student Name,Course,CW (40),Exam (60),Total,Grade,Status";
      const rows = studentResults.map(r => {
        const s = students.find(st => st.id === r.studentId);
        return `${r.studentId},"${s?.name ?? "Unknown"}",${r.code},${r.cw},${r.exam},${r.score},${r.grade},${r.score >= 50 ? "Pass" : "Fail"}`;
      });
      csv = [header, ...rows].join("\n");

    } else if (generator === "marks") {
      const header = "Student ID,Name,Courses Taken,Avg Score,Highest Grade,Status";
      const rows = students.map(s => {
        const results = studentResults.filter(r => r.studentId === s.id);
        const avg = results.length ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1) : "N/A";
        const best = results.sort((a, b) => b.gp - a.gp)[0]?.grade ?? "N/A";
        return `${s.id},"${s.name}",${results.length},${avg},${best},${s.status}`;
      });
      csv = [header, ...rows].join("\n");

    } else if (generator === "atrisk") {
      const header = "Student ID,Name,Course,Total Score,Grade,Risk Level";
      const rows = studentResults
        .filter(r => r.score < 60)
        .map(r => {
          const s = students.find(st => st.id === r.studentId);
          const risk = r.score < 45 ? "High" : r.score < 50 ? "Medium" : "Low";
          return `${r.studentId},"${s?.name ?? "Unknown"}",${r.code},${r.score},${r.grade},${risk}`;
        });
      csv = [header, ...rows].join("\n") || "No at-risk students found.";

    } else {
      csv = "Assignment Title,Course,Due Date,Submissions,Total,Rate,Status\n" +
        "System Design Proposal,SWE313,2025-11-05,42,45,93.3%,Active\n" +
        "React Hooks Lab,BIT201,2025-10-30,38,40,95.0%,Closing Soon\n" +
        "Mid-Sem Take Home,BCS101,2025-10-25,120,120,100.0%,Grading";
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click(); URL.revokeObjectURL(url);
    toast.success(`"${title}" downloaded.`);
  };

  const getGradeColor = (total: number) => {
    if (total >= 80) return "bg-emerald-500";
    if (total >= 65) return "bg-blue-500";
    if (total >= 50) return "bg-amber-400";
    return "bg-red-400";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Class Analytics</h1>
          <p className="text-slate-500 mt-1">Detailed performance metrics and downloadable audit reports for your courses.</p>
        </div>
        <button onClick={() => setTrackerOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
          <TrendingUp size={18} /> Open Performance Tracker
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Avg Attendance", val: "88.4%", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Pass Rate", val: `${passRate}%`, icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Class Avg Score", val: `${avgScore}%`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}><s.icon size={20} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Audit Reports</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Search reports..." />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredReports.map(report => (
              <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{report.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{report.category} · {report.date} · {report.type}</p>
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); downloadReport(report.generator, report.title); }}
                  className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Panel */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-2">Performance Tracker</h3>
            <p className="text-indigo-100 text-xs mb-6">Visualise student progress against learning outcomes — live data from the grading centre.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10">
                <span className="text-xs font-bold">Students graded</span>
                <span className="text-xs font-black">{studentResults.length} entries</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10">
                <span className="text-xs font-bold">Passing students</span>
                <span className="text-xs font-black">{studentResults.filter(r => r.score >= 50).length}</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10">
                <span className="text-xs font-bold">At-risk students</span>
                <span className="text-xs font-black text-red-300">{studentResults.filter(r => r.score < 50).length}</span>
              </div>
            </div>
            <button onClick={() => setTrackerOpen(true)}
              className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
              Open Tracker
            </button>
          </div>
          <BarChart size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>

      {/* ── Performance Tracker Modal ── */}
      {trackerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Performance Tracker</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <select value={trackerCourse} onChange={e => setTrackerCourse(e.target.value)}
                    className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1 outline-none">
                    {courses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => downloadReport("performance", `Performance-Tracker-${trackerCourse}`)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download CSV">
                  <Download size={16} />
                </button>
                <button onClick={() => setTrackerOpen(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X size={16} /></button>
              </div>
            </div>

            {/* Tracker Stats */}
            <div className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 gap-4">
              {[
                { label: "Graded", val: trackerStats.submitted },
                { label: "Avg Score", val: `${trackerStats.avg}%` },
                { label: "Passing", val: trackerStats.passing },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-xl font-black text-slate-900">{s.val}</p>
                </div>
              ))}
            </div>

            {/* Search in tracker */}
            <div className="px-5 py-3 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-64"
                  placeholder="Search student..." />
              </div>
            </div>

            {/* Student rows */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {trackerRows.length === 0 ? (
                <div className="py-16 text-center">
                  <AlertCircle size={32} className="mx-auto mb-3 text-slate-200" />
                  <p className="text-slate-400 font-bold text-sm">No students found.</p>
                </div>
              ) : (
                trackerRows.map(s => (
                  <div key={s.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="w-40 shrink-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{s.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{s.id.replace("CUU-", "")}</p>
                    </div>
                    <div className="flex-1">
                      {s.submitted ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${getGradeColor(s.total)}`} style={{ width: `${s.total}%` }} />
                          </div>
                          <span className="text-xs font-black text-slate-700 w-8 text-right">{s.total}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-300">
                          <div className="flex-1 bg-slate-100 h-3 rounded-full" />
                          <span className="text-xs text-slate-400 w-16">Not graded</span>
                        </div>
                      )}
                    </div>
                    <div className="w-16 text-right shrink-0">
                      {s.submitted ? (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.total >= 50 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                          {s.grade}
                        </span>
                      ) : (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-between items-center">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> ≥80</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> 65–79</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> 50–64</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> &lt;50</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => downloadReport("performance", `Tracker-${trackerCourse}`)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center gap-2">
                  <Download size={15} /> Export CSV
                </button>
                <button onClick={() => setTrackerOpen(false)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
