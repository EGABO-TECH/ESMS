"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, FileText, BookOpen, GraduationCap, Flag } from "lucide-react";

const milestones = [
  { date: "April 15, 2026",  title: "Mid-Semester Examinations Begin",    type: "exam",     color: "bg-primary" },
  { date: "May 20, 2026",    title: "Coursework & Assignment Deadline",    type: "deadline", color: "bg-purple-600" },
  { date: "June 10, 2026",   title: "Final Examinations Commencement",     type: "exam",     color: "bg-error" },
  { date: "June 25, 2026",   title: "Official End of Semester 1 2025/2026", type: "closing", color: "bg-finance-success" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Very simplified calendar: just April 2026 (starts on Wednesday = index 3)
const CALENDAR = {
  month: 3, // April (0-indexed)
  year: 2026,
  startDay: 3, // Wednesday
  days: 30,
  events: [15], // April 15 highlighted
};

export default function StudentRoadmap() {
  const [currentMonth, setCurrentMonth] = useState(CALENDAR.month);
  const [currentYear, setCurrentYear] = useState(CALENDAR.year);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const isHighlighted = (d: number) => {
    // April 15, June 10
    if (currentMonth === 3 && d === 15) return "bg-primary text-white font-bold rounded-xl shadow-md";
    if (currentMonth === 5 && d === 10) return "bg-error text-white font-bold rounded-xl shadow-md";
    if (currentMonth === 4 && d === 20) return "bg-purple-600 text-white font-bold rounded-xl shadow-md";
    if (currentMonth === 5 && d === 25) return "bg-finance-success text-white font-bold rounded-xl shadow-md";
    return "hover:bg-surface-container rounded-lg";
  };

  const prev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const next = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  return (
    <main className="w-full pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-on-surface">Semester Roadmap</h1>
          <p className="text-sm text-on-surface-variant mt-1">Official academic timeline · Faculty of Science &amp; Technology</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20">
          <CalendarDays size={16} />
          <span className="text-xs font-bold">Current Week: 12 · Semester 1</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left: Calendar ── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-on-surface">{MONTHS[currentMonth]} {currentYear}</h4>
              <div className="flex gap-2">
                <button onClick={prev} className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                  <ChevronLeft size={16} className="text-on-surface-variant" />
                </button>
                <button onClick={next} className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                  <ChevronRight size={16} className="text-on-surface-variant" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-on-surface-variant mb-3">
              {["S","M","T","W","T","F","S"].map((d,i) => <span key={i}>{d}</span>)}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: startDay }).map((_, i) => (
                <span key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const cls = isHighlighted(day);
                return (
                  <span
                    key={day}
                    className={`p-1 cursor-pointer text-on-surface transition-colors ${cls} flex items-center justify-center h-8 w-full text-xs`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-5 border-t border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                <span className="text-on-surface-variant">Mid-Semester Exams Start (Apr 15)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-purple-600 rounded-full shrink-0" />
                <span className="text-on-surface-variant">Coursework Deadline (May 20)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-error rounded-full shrink-0" />
                <span className="text-on-surface-variant">Final Examinations Start (Jun 10)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-finance-success rounded-full shrink-0" />
                <span className="text-on-surface-variant">End of Semester (Jun 25)</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm text-center">
              <BookOpen size={24} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-on-surface">6</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase">Enrolled Courses</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm text-center">
              <GraduationCap size={24} className="text-sis-accent mx-auto mb-2" />
              <p className="text-2xl font-black text-on-surface">4.25</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase">Current CGPA</p>
            </div>
          </div>
        </div>

        {/* ── Right: Timeline ── */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-border-subtle shadow-sm">
          <h4 className="font-bold text-on-surface mb-8 flex items-center gap-2">
            <Flag size={18} className="text-primary" /> Key Semester Milestones
          </h4>

          <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-subtle">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white shadow-md z-10 ${m.color} flex items-center justify-center`}>
                  {m.type === "exam"     && <FileText size={14} className="text-white" />}
                  {m.type === "deadline" && <BookOpen size={14} className="text-white" />}
                  {m.type === "closing"  && <Flag size={14} className="text-white" />}
                </div>
                <div className="p-4 bg-surface-container-low rounded-2xl group-hover:bg-primary/5 transition-colors border border-transparent group-hover:border-primary/20">
                  <p className="text-xs font-bold text-on-surface-variant mb-1">{m.date}</p>
                  <h5 className="font-bold text-on-surface">{m.title}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* Important Deadlines Notice */}
          <div className="mt-8 p-6 bg-exam-warning/5 rounded-2xl border border-exam-warning/20">
            <p className="text-xs font-bold text-exam-warning uppercase mb-2">⚠ Upcoming Deadline</p>
            <p className="text-sm font-semibold text-on-surface">Coursework &amp; Assignment Submission</p>
            <p className="text-xs text-on-surface-variant mt-1">May 18, 2026 · All submissions must be uploaded before 23:59 EAT via the Student Portal.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
