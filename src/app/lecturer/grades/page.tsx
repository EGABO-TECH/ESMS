"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  ChevronRight,
  ClipboardCheck,
  AlertCircle,
  CheckCircle,
  FileText,
  TrendingUp,
  Download,
  X
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

type GradeBand = {
  grade: string;
  min: number;
  max: number;
  gradePoint: number;
  remark: string;
};

const UG_GRADING_BANDS: GradeBand[] = [
  { grade: "A", min: 80, max: 100, gradePoint: 5.0, remark: "Excellent" },
  { grade: "B+", min: 75, max: 79, gradePoint: 4.5, remark: "Very Good" },
  { grade: "B", min: 70, max: 74, gradePoint: 4.0, remark: "Good" },
  { grade: "C+", min: 65, max: 69, gradePoint: 3.5, remark: "Fairly Good" },
  { grade: "C", min: 60, max: 64, gradePoint: 3.0, remark: "Satisfactory" },
  { grade: "D", min: 50, max: 59, gradePoint: 2.0, remark: "Pass" },
  { grade: "E", min: 45, max: 49, gradePoint: 1.5, remark: "Marginal Fail" },
  { grade: "F", min: 0, max: 44, gradePoint: 0.0, remark: "Fail" },
];

const getBand = (total: number) =>
  UG_GRADING_BANDS.find((band) => total >= band.min && total <= band.max) ??
  UG_GRADING_BANDS[UG_GRADING_BANDS.length - 1];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LecturerGradesPage() {
  const [activeCourse, setActiveCourse] = useState("SWE311");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const {
    students: rawStudents,
    courses,
    grading,
    setGrading,
    studentResults,
    setStudentResults,
  } = useGlobalContext();

  // Build grading rows from real student data + mock scores
  const mockScores: Record<string, { cw: number; exam: number }> = {
    "CUU-258-154": { cw: 34, exam: 47 },
    "CUU-230-500": { cw: 30, exam: 35 },
    "CUU-273-318": { cw: 32, exam: 44 },
    "CUU-269-896": { cw: 28, exam: 48 },
    "CUU-274-500": { cw: 35, exam: 46 },
  };
  const [scores, setScores] = useState<
    Record<string, Record<string, { cw: number; exam: number }>>
  >(() =>
    courses.reduce<Record<string, Record<string, { cw: number; exam: number }>>>(
      (courseAcc, course) => {
        courseAcc[course.code] = rawStudents.reduce<
          Record<string, { cw: number; exam: number }>
        >((studentAcc, student) => {
          const savedResult = studentResults.find(
            (result) =>
              result.code === course.code && result.studentId === student.id
          );
          studentAcc[student.id] = savedResult
            ? {
                cw: savedResult.cw ?? mockScores[student.id]?.cw ?? 28,
                exam: savedResult.exam ?? mockScores[student.id]?.exam ?? 40,
              }
            : mockScores[student.id] ?? { cw: 28, exam: 40 };
          return studentAcc;
        }, {});
        return courseAcc;
      },
      {}
    )
  );

  const gradingRows = useMemo(
    () =>
      rawStudents
        .map((student) => {
          const current = scores[activeCourse]?.[student.id] ?? { cw: 0, exam: 0 };
          const cw = clamp(current.cw, 0, 40);
          const exam = clamp(current.exam, 0, 60);
          const total = cw + exam;
          const band = getBand(total);
          return {
            recordId: student.id,
            id: student.id.replace("CUU-", ""),
            name: student.name,
            cw,
            exam,
            total,
            grade: band.grade,
            gradePoint: band.gradePoint,
            remark: band.remark,
          };
        })
        .filter((student) => {
          const query = searchTerm.trim().toLowerCase();
          if (!query) return true;
          return (
            student.name.toLowerCase().includes(query) ||
            student.id.toLowerCase().includes(query)
          );
        }),
    [activeCourse, rawStudents, scores, searchTerm]
  );

  const classAverage = useMemo(() => {
    if (gradingRows.length === 0) return 0;
    return (
      gradingRows.reduce((sum, row) => sum + row.total, 0) / gradingRows.length
    );
  }, [gradingRows]);

  const passRate = useMemo(() => {
    if (gradingRows.length === 0) return 0;
    const passed = gradingRows.filter((row) => row.total >= 50).length;
    return (passed / gradingRows.length) * 100;
  }, [gradingRows]);

  const atRiskCount = useMemo(
    () => gradingRows.filter((row) => row.total < 50).length,
    [gradingRows]
  );
  const gradeDistribution = useMemo(
    () =>
      UG_GRADING_BANDS.map((band) => ({
        ...band,
        count: gradingRows.filter((row) => row.grade === band.grade).length,
      })),
    [gradingRows]
  );

  const updateScore = (
    studentId: string,
    key: "cw" | "exam",
    value: string
  ) => {
    const parsed = Number(value);
    const max = key === "cw" ? 40 : 60;
    const nextValue = Number.isFinite(parsed) ? clamp(parsed, 0, max) : 0;
    setScores((prev) => ({
      ...prev,
      [activeCourse]: {
        ...(prev[activeCourse] ?? {}),
        [studentId]: {
          ...((prev[activeCourse] ?? {})[studentId] ?? { cw: 0, exam: 0 }),
          [key]: nextValue,
        },
      },
    }));
  };

  const saveStudentResult = (row: (typeof gradingRows)[number]) => {
    const activeCourseData = courses.find((course) => course.code === activeCourse);
    if (!activeCourseData) {
      toast.error("No active course selected.");
      return;
    }

    setStudentResults((prev) => {
      const nextResult = {
        studentId: row.recordId,
        code: activeCourse,
        name: activeCourseData.name,
        credits: activeCourseData.credits,
        cw: row.cw,
        exam: row.exam,
        score: row.total,
        grade: row.grade,
        gp: row.gradePoint,
      };

      const existingIndex = prev.findIndex(
        (result) =>
          result.studentId === row.recordId && result.code === activeCourse
      );

      if (existingIndex === -1) {
        return [...prev, nextResult];
      }

      return prev.map((result, index) =>
        index === existingIndex ? nextResult : result
      );
    });

    setGrading((prev) =>
      prev.map((entry) =>
        entry.code === activeCourse
          ? {
              ...entry,
              name: activeCourseData.name,
              students: gradingRows.length,
              avg: `${classAverage.toFixed(0)}%`,
              lecturer: activeCourseData.lecturer,
              status: atRiskCount > 0 ? "Moderating" : "Approved",
            }
          : entry
      )
    );

    toast.success(`Result saved for ${row.name}.`);
  };

  const submitFinalResults = () => {
    const activeCourseData = courses.find((course) => course.code === activeCourse);
    if (!activeCourseData) {
      toast.error("No active course selected.");
      return;
    }

    gradingRows.forEach((row) => {
      setStudentResults((prev) => {
        const nextResult = {
          studentId: row.recordId,
          code: activeCourse,
          name: activeCourseData.name,
          credits: activeCourseData.credits,
          cw: row.cw,
          exam: row.exam,
          score: row.total,
          grade: row.grade,
          gp: row.gradePoint,
        };
        const existingIndex = prev.findIndex(
          (result) =>
            result.studentId === row.recordId && result.code === activeCourse
        );
        if (existingIndex === -1) {
          return [...prev, nextResult];
        }
        return prev.map((result, index) =>
          index === existingIndex ? nextResult : result
        );
      });
    });

    setGrading((prev) =>
      prev.map((entry) =>
        entry.code === activeCourse
          ? {
              ...entry,
              name: activeCourseData.name,
              students: gradingRows.length,
              avg: `${classAverage.toFixed(0)}%`,
              lecturer: activeCourseData.lecturer,
              status: "Approved",
            }
          : entry
      )
    );

    toast.success("Final results submitted to Registry.");
  };

  const exportMarksheet = () => {
    const activeCourseData = courses.find((course) => course.code === activeCourse);
    const headers = [
      "Course Code",
      "Course Name",
      "Student ID",
      "Student Name",
      "Coursework (40)",
      "Exam (60)",
      "Total (100)",
      "Grade",
      "Grade Point",
      "Remark",
    ];
    const rows = gradingRows.map((row) => [
      activeCourse,
      activeCourseData?.name ?? "N/A",
      row.id,
      row.name,
      row.cw,
      row.exam,
      row.total,
      row.grade,
      row.gradePoint.toFixed(1),
      row.total >= 50 ? "Pass" : row.grade === "E" ? "Supplementary" : "Fail",
    ]);

    const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => quote(String(value))).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `marksheet-${activeCourse.toLowerCase()}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Marksheet export started.");
  };

  const downloadGradingPolicy = () => {
    const rubric = [
      "Cavendish University Uganda - Lecturer Grading Policy",
      "Scale aligned to common Ugandan university undergraduate grading bands.",
      "",
      "Score Range,Grade,Grade Point,Interpretation",
      ...UG_GRADING_BANDS.map(
        (band) =>
          `${band.min}-${band.max},${band.grade},${band.gradePoint.toFixed(
            1
          )},${band.remark}`
      ),
      "",
      "Notes:",
      "- Coursework carries 40 marks; final exam carries 60 marks.",
      "- Total mark is out of 100.",
      "- Pass mark is 50 and above (D and above).",
      "- E (45-49) is treated as marginal fail/supplementary where applicable.",
    ].join("\n");

    const blob = new Blob([rubric], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ugandan-grading-policy.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Grading policy downloaded.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Academic Portal</span>
            <ChevronRight size={10} />
            <span className="text-indigo-600">Grading Center</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Module Grading</h1>
          <p className="text-slate-500 mt-1">Submit internal marks, coursework scores, and examination results.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportMarksheet} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export Marksheet
          </button>
          <button onClick={submitFinalResults} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <ClipboardCheck size={18} /> Final Submission
          </button>
        </div>
      </div>

      {/* Course Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {courses.map(c => (
          <button 
            key={c.code}
            onClick={() => setActiveCourse(c.code)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCourse === c.code ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Grading Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              Student Marksheet — {activeCourse}
              {courses.find(c => c.code === activeCourse) && (
                <span className="text-sm font-medium text-slate-400 ml-2">
                  {courses.find(c => c.code === activeCourse)?.name}
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-48"
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <button onClick={() => alert('Feature in development...')}  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">CW (40)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Exam (60)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total (100)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gradingRows.map((s) => (
                  <tr key={s.recordId} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm">{s.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{s.id}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={s.cw}
                        onChange={(event) =>
                          updateScore(s.recordId, "cw", event.target.value)
                        }
                        className="w-16 text-center py-1 bg-transparent border-b border-transparent focus:border-indigo-600 focus:bg-indigo-50/50 outline-none text-sm font-bold text-slate-600 transition-all"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min={0}
                        max={60}
                        value={s.exam}
                        onChange={(event) =>
                          updateScore(s.recordId, "exam", event.target.value)
                        }
                        className="w-16 text-center py-1 bg-transparent border-b border-transparent focus:border-indigo-600 focus:bg-indigo-50/50 outline-none text-sm font-bold text-slate-600 transition-all"
                      />
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-black text-slate-900">{s.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        s.total >= 50 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>
                        {s.grade} ({s.gradePoint.toFixed(1)})
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => saveStudentResult(s)} className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all">
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Performance Insights</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Class Average</p>
                  <p className="text-2xl font-black text-slate-900">{classAverage.toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pass Rate</p>
                  <p className="text-2xl font-black text-slate-900">{passRate.toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
                <AlertCircle size={20} />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Action Needed</p>
                  <p className="text-xs font-bold mt-1">
                    {atRiskCount} students are below the 50% pass mark.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#00174b] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Grading Policy</h4>
              <p className="text-blue-200 text-xs mb-4">
                Ugandan-style grading bands with grade points and pass mark guidance.
              </p>
              <div className="mb-4 text-[11px] bg-white/10 rounded-xl p-3 space-y-1">
                {UG_GRADING_BANDS.map((band) => (
                  <p key={band.grade} className="flex items-center justify-between gap-3">
                    <span>{band.grade} ({band.min}-{band.max})</span>
                    <span className="font-black">{band.gradePoint.toFixed(1)} GP</span>
                  </p>
                ))}
              </div>
              <button onClick={() => setIsRubricOpen(true)} className="w-full py-3 bg-white text-[#00174b] font-black rounded-xl text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                <FileText size={16} /> View Grading Rubric
              </button>
            </div>
          </div>
        </div>
      </div>

      {isRubricOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Grading Rubric — {activeCourse}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Live mapping from current marks to grade bands.
                </p>
              </div>
              <button
                onClick={() => setIsRubricOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close rubric"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-4">
                Coursework is marked out of <span className="font-black">40</span>, exam out of <span className="font-black">60</span>,
                and final grade is based on total out of <span className="font-black">100</span>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gradeDistribution.map((band) => (
                  <div key={band.grade} className="rounded-xl border border-slate-100 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {band.grade} ({band.min}-{band.max})
                      </p>
                      <p className="text-xs text-slate-500">
                        GP {band.gradePoint.toFixed(1)} · {band.remark}
                      </p>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {band.count} student{band.count === 1 ? "" : "s"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                onClick={downloadGradingPolicy}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100"
              >
                Download Policy
              </button>
              <button
                onClick={() => setIsRubricOpen(false)}
                className="px-4 py-2.5 bg-[#00174b] text-white rounded-xl text-sm font-bold hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
