import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileText, BookOpen, Clock, History } from "lucide-react";

const gradeColor = (grade: string | null) => {
  if (!grade) return "text-slate-400";
  if (["A", "A+", "A-"].includes(grade)) return "text-finance-success";
  if (["B", "B+", "B-"].includes(grade)) return "text-primary";
  if (["C", "C+", "C-"].includes(grade)) return "text-exam-warning";
  return "text-error";
};

export default async function StudentAcademics() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: student } = await supabase
    .from("students")
    .select("id, cgpa, credits_earned, credits_remaining, programme, year_of_study")
    .eq("profile_id", user.id)
    .single();

  // Fetch enrollments with course info
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(code, title, credits, semester)")
    .eq("student_id", student?.id ?? "")
    .order("semester", { ascending: false });

  // Group by semester
  const bySemester: Record<string, typeof enrollments> = {};
  (enrollments ?? []).forEach(e => {
    const key = `${e.academic_year} - Semester ${e.semester}`;
    if (!bySemester[key]) bySemester[key] = [];
    bySemester[key]!.push(e);
  });

  const semesterKeys = Object.keys(bySemester).sort().reverse();

  return (
    <main className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-on-surface">Academic Performance</h1>
        <p className="text-sm text-on-surface-variant mt-1">{student?.programme ?? "—"}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">Cumulative GPA</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary">{student?.cgpa?.toFixed(2) ?? "—"}</span>
                <span className="text-2xl font-bold text-on-surface-variant">/ 4.0</span>
              </div>
            </div>
            <div className="bg-finance-success/10 text-finance-success px-3 py-1 rounded-full text-xs font-bold">
              {(student?.cgpa ?? 0) >= 3.6 ? "FIRST CLASS" : (student?.cgpa ?? 0) >= 3.0 ? "UPPER 2ND" : "PASS"}
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${((student?.cgpa ?? 0) / 4.0) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs font-medium text-on-surface-variant mt-2">
            <span>PROGRESS TO GRADUATION</span>
            <span>{Math.round(((student?.cgpa ?? 0) / 4.0) * 100)}%</span>
          </div>
        </section>

        <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <BookOpen className="text-sis-accent mb-3" size={32} />
          <span className="block text-4xl font-black">{student?.credits_earned ?? 0}</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mt-1">Credits Earned</span>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-center">
          <Clock className="text-exam-warning mb-3" size={32} />
          <span className="block text-4xl font-black">{student?.credits_remaining ?? 0}</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mt-1">Credits Remaining</span>
        </div>
      </div>

      {/* Exam Card */}
      <section className="bg-primary text-white rounded-xl p-6 mb-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <FileText size={32} />
          <div>
            <p className="font-bold text-lg">Exam Timetable</p>
            <p className="text-white/70 text-sm">Download your personalised exam schedule</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-primary font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">
            Download PDF
          </button>
          <div className="flex items-center gap-1">
            <History className="text-white/60" size={18} />
            <span className="text-white/60 text-xs">Nov 15</span>
          </div>
        </div>
      </section>

      {/* Semester Breakdowns */}
      {semesterKeys.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesterKeys.map(key => (
            <div key={key} className="bg-white rounded-xl overflow-hidden border border-border-subtle shadow-sm">
              <div className="bg-surface-container-low px-6 py-3 border-b border-border-subtle flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{key}</h3>
                <span className="text-xs font-bold text-slate-500">
                  {bySemester[key]?.length} COURSES
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
                  {bySemester[key]?.map(enr => (
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
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-border-subtle">
          <BookOpen className="mx-auto mb-3 text-slate-200" size={48} />
          <p className="text-slate-500 font-medium">No enrollment records found yet.</p>
          <p className="text-slate-400 text-sm mt-1">Your grades will appear here once processed.</p>
        </div>
      )}
    </main>
  );
}
