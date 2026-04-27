"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Award, Info, Lock, Download, X, AlertTriangle, CheckCircle } from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HAS_BALANCE = true;
const BALANCE_AMOUNT = "UGX 1,250,000";

const results = [
  { code: "SWE311", name: "Software Architecture", credits: 4, score: 81, grade: "A",  gp: 5.0 },
  { code: "SWE312", name: "Database Systems",       credits: 3, score: 76, grade: "B+", gp: 4.5 },
  { code: "SWE313", name: "Web Engineering",         credits: 4, score: 83, grade: "A",  gp: 5.0 },
  { code: "SWE314", name: "Computer Networks",       credits: 3, score: 44, grade: "F",  gp: 0.0 },
  { code: "SWE315", name: "Operating Systems",       credits: 3, score: 62, grade: "C",  gp: 3.0 },
  { code: "SWE316", name: "Algorithms & Complexity", credits: 4, score: 71, grade: "B",  gp: 4.0 },
];

const gradingScale = [
  { grade: "A",  range: "80–100", gp: "5.0", color: "text-finance-success" },
  { grade: "B+", range: "75–79",  gp: "4.5", color: "text-primary" },
  { grade: "B",  range: "70–74",  gp: "4.0", color: "text-primary" },
  { grade: "C+", range: "65–69",  gp: "3.5", color: "text-exam-warning" },
  { grade: "C",  range: "60–64",  gp: "3.0", color: "text-exam-warning" },
  { grade: "D",  range: "50–59",  gp: "2.0", color: "text-orange-500" },
  { grade: "F",  range: "0–49",   gp: "0.0", color: "text-error" },
];

const gradeColor = (grade: string) => {
  if (grade === "A") return "bg-finance-success/10 text-finance-success";
  if (grade === "B+" || grade === "B") return "bg-primary/10 text-primary";
  if (grade === "C+" || grade === "C") return "bg-exam-warning/10 text-exam-warning";
  if (grade === "D") return "bg-orange-100 text-orange-600";
  return "bg-error/10 text-error";
};

export default function StudentResults() {
  const [showGrading, setShowGrading] = useState(false);
  const [retakeModule, setRetakeModule] = useState<{ code: string; name: string } | null>(null);
  const [retakeReason, setRetakeReason] = useState("Failed Exam (Score < 50)");
  const [submittingRetake, setSubmittingRetake] = useState(false);

  const clearedResults = results.filter(r => r.grade !== "F");
  const semGPA = clearedResults.length
    ? (clearedResults.reduce((s, r) => s + r.gp * r.credits, 0) / clearedResults.reduce((s, r) => s + r.credits, 0)).toFixed(2)
    : "0.00";

  const handleRetakeSubmit = () => {
    setSubmittingRetake(true);
    setTimeout(() => {
      setSubmittingRetake(false);
      setRetakeModule(null);
      toast.success(`Retake application for ${retakeModule?.code} submitted. UGX 100,000 billed to your account.`);
    }, 1000);
  };

  return (
    <main className="w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-on-surface">Academic Results</h1>
        <p className="text-sm text-on-surface-variant mt-1">Semester 1 Provisional Results · 2025/2026</p>
      </div>

      <div className="space-y-8">
        {/* Header Card */}
        <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Academic Results Overview</h2>
            <p className="text-sm text-on-surface-variant">Semester 1 Provisional Results · 2025/2026</p>
          </div>
          <button
            onClick={() => setShowGrading(v => !v)}
            className="text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/10 transition-all flex items-center gap-2"
          >
            <Info size={14} /> {showGrading ? "Hide" : "View"} Grading Standard
          </button>
        </div>

        {/* Grading Standard Panel */}
        {showGrading && (
          <div className="bg-[#00174b] text-white rounded-2xl p-8">
            <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-blue-200">Uganda Standard University Grading (5.0 Scale)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {gradingScale.map(g => (
                <div key={g.grade} className={`p-3 ${g.grade === "F" ? "bg-error/20" : "bg-white/10"} rounded-xl text-center`}>
                  <p className={`text-xl font-bold ${g.grade === "F" ? "text-red-200" : ""}`}>{g.grade}</p>
                  <p className="text-[10px] text-blue-200">{g.range}</p>
                  <p className="text-[10px] text-blue-300 font-bold">GP: {g.gp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Gate Banner */}
        {HAS_BALANCE && (
          <div className="bg-error/5 border border-error/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <Lock size={28} className="text-error" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="text-error font-bold text-lg">Results Partially Withheld</h4>
              <p className="text-sm text-error/80 mt-1">
                Outstanding balance of <strong>{BALANCE_AMOUNT}</strong>. Scores and grades are blocked until payment is cleared.
              </p>
            </div>
            <button
              onClick={() => toast.info("Redirecting to payment gateway...")}
              className="bg-error text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              Pay Balance Online
            </button>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Module Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Credits</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Grade</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">GP</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {results.map(r => {
                  const isFail = r.grade === "F";
                  return (
                    <tr key={r.code} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-primary text-sm">{r.code}</td>
                      <td className="px-6 py-4 font-medium text-on-surface text-sm">{r.name}</td>
                      <td className="px-6 py-4 text-center text-sm text-on-surface-variant">{r.credits}</td>
                      <td className="px-6 py-4 text-center">
                        {HAS_BALANCE
                          ? <span className="text-[10px] font-bold text-error bg-error/5 px-2 py-1 rounded">BLOCKED</span>
                          : <span className={`text-sm font-bold ${isFail ? "text-error" : "text-on-surface"}`}>{r.score}</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-center">
                        {HAS_BALANCE
                          ? <span className="text-[10px] font-bold text-error bg-error/5 px-2 py-1 rounded">BLOCKED</span>
                          : <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${gradeColor(r.grade)}`}>{r.grade}</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-on-surface text-sm">
                        {HAS_BALANCE ? "—" : r.gp.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!HAS_BALANCE && isFail ? (
                          <button
                            onClick={() => setRetakeModule({ code: r.code, name: r.name })}
                            className="text-[11px] font-bold text-error hover:underline underline-offset-4"
                          >
                            Apply for Retake
                          </button>
                        ) : (
                          <span className="text-[10px] text-on-surface-variant font-bold uppercase">No Action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* GPA Summary — shown only if cleared */}
        {!HAS_BALANCE && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-white border border-border-subtle rounded-2xl shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Award size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Semester GPA</p>
                <p className="text-4xl font-black text-primary">{semGPA} <span className="text-xl text-on-surface-variant font-bold">/ 5.0</span></p>
              </div>
            </div>
            <button
              onClick={() => toast.success("Downloading provisional results...")}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl flex items-center gap-3 active:scale-95"
            >
              <Download size={20} />
              Download Provisional Results
            </button>
          </div>
        )}
      </div>

      {/* ── Retake Application Modal ─────────────────────────── */}
      {retakeModule && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRetakeModule(null)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#00174b] p-6 text-center text-white">
              <h3 className="text-xl font-bold">Retake Application</h3>
              <p className="text-blue-100 text-xs mt-1">Official Registrar Form — F.24</p>
            </div>
            <button onClick={() => setRetakeModule(null)} className="absolute top-4 right-4 text-white hover:text-red-300">
              <X size={22} />
            </button>

            <div className="p-8 space-y-6">
              {/* Target Module */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Target Module</label>
                <div className="p-3 bg-surface-container-low rounded-xl text-primary font-bold text-sm">
                  {retakeModule.code} — {retakeModule.name}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Reason for Retake</label>
                <select
                  value={retakeReason}
                  onChange={e => setRetakeReason(e.target.value)}
                  className="w-full p-3 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                >
                  <option>Failed Exam (Score &lt; 50)</option>
                  <option>Missed Examination</option>
                  <option>Medical Emergency</option>
                </select>
              </div>

              {/* Fee */}
              <div className="bg-primary/5 p-4 rounded-2xl flex justify-between items-center border border-primary/20">
                <span className="text-sm font-medium text-primary">Retake Fee</span>
                <span className="text-lg font-bold text-primary">UGX 100,000</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setRetakeModule(null)}
                  className="flex-1 py-3 bg-surface-container-low text-on-surface font-bold rounded-xl text-sm hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRetakeSubmit}
                  disabled={submittingRetake}
                  className="flex-1 py-3 bg-[#00174b] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submittingRetake ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                  ) : (
                    <><CheckCircle size={16} /> Submit &amp; Bill Account</>
                  )}
                </button>
              </div>

              <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-exam-warning" />
                <span>By submitting, you agree that the UGX 100,000 retake fee will be added to your student account ledger.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
