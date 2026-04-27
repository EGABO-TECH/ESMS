import Link from "next/link";
import { BookOpen, Wallet, CalendarDays, TrendingUp, AlertCircle } from "lucide-react";

export default async function StudentDashboard() {
  // Mock Data
  const profile = { full_name: "Egabo Aaron", campus: "Ggaba Campus" };
  const student = {
    id: 1,
    cgpa: 4.25,
    credits_earned: 86,
    credits_remaining: 34,
    programme: "BSc Software Engineering",
    year_of_study: 3,
    student_number: "258-154"
  };
  
  const finance = { balance_ugx: 1250000, due_date: "2024-05-15T00:00:00Z", status: "pending" };
  
  const events = [
    { id: 1, title: "Mid-Semester Exams Begin", event_date: "2024-03-10T00:00:00Z" },
    { id: 2, title: "Cultural Gala", event_date: "2024-03-25T00:00:00Z" },
    { id: 3, title: "Career Fair", event_date: "2024-04-05T00:00:00Z" }
  ];

  const balanceUGX = finance?.balance_ugx ?? 0;

  return (
    <main className="w-full pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-on-surface">Welcome back,</h1>
        <p className="text-2xl font-bold text-primary">{profile?.full_name ?? "Student"}</p>
        <p className="text-sm text-on-surface-variant mt-1">{student?.programme ?? "Programme not set"} · {profile?.campus}</p>
        {student?.student_number && (
          <span className="inline-block mt-2 px-2 py-1 bg-surface-container text-xs font-bold text-outline rounded uppercase tracking-wider">
            {student.student_number}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Academics Card */}
        <Link href="/student/academics" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="text-primary" size={20} />
              </div>
              <span className="font-semibold text-slate-700">Academics</span>
            </div>
            <TrendingUp className="text-slate-300" size={20} />
          </div>
          <div className="mt-2">
            <p className="text-sm text-slate-500 mb-1">Current GPA</p>
            <p className="text-3xl font-black text-primary">{student?.cgpa?.toFixed(2) ?? "—"}</p>
            <p className="text-xs text-slate-400 mt-1">Year {student?.year_of_study ?? "—"} · {student?.credits_earned ?? 0} credits earned</p>
          </div>
        </Link>

        {/* Finance Card */}
        <Link href="/student/finance" className="block bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center group-hover:bg-error/20 transition-colors">
                <Wallet className="text-error" size={20} />
              </div>
              <span className="font-semibold text-slate-700">Finance</span>
            </div>
            {balanceUGX > 0 && <AlertCircle className="text-error" size={18} />}
          </div>
          <p className="text-sm text-slate-500 mb-1">Outstanding Balance</p>
          <p className={`text-2xl font-black ${balanceUGX > 0 ? "text-error" : "text-finance-success"}`}>
            UGX {balanceUGX.toLocaleString()}
          </p>
          {finance?.due_date && (
            <p className="text-xs text-slate-400 mt-1">
              Due: {new Date(finance.due_date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </Link>

        {/* Events Card */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sis-accent/10 rounded-lg flex items-center justify-center">
              <CalendarDays className="text-sis-accent" size={20} />
            </div>
            <span className="font-semibold text-slate-700">Upcoming Events</span>
          </div>
          {events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map(event => {
                const d = new Date(event.event_date);
                return (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="text-center min-w-[40px]">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{d.toLocaleDateString("en-UG", { month: "short" })}</p>
                      <p className="text-xl font-black text-primary leading-tight">{d.getDate()}</p>
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{event.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No upcoming events.</p>
          )}
        </div>
      </div>
    </main>
  );
}
