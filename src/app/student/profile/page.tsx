"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap, User, Phone, Globe, Mail, ShieldCheck,
  FileText, Ticket, Lock, IdCard, Download, X, QrCode,
  BookOpen, TrendingUp, Calendar, Edit3, CheckCircle2
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const student = {
  full_name: "Egabo Aaron",
  username: "egabo_aaron",
  student_number: "CUU-2024-258154",
  programme: "BSc. Software Engineering",
  faculty: "Faculty of Science & Technology",
  year_of_study: 3,
  semester: 1,
  cgpa: 4.25,
  credits_earned: 86,
  credits_remaining: 34,
  email: "a.egabo@cavendish.ac.ug",
  personal_email: "egaboaaron@gmail.com",
  nationality: "Ugandan",
  phone: "+256 701 234 567",
  emergency_contact: "+256 772 999 888",
  campus: "Ggaba Campus",
  enrolled_date: "Jan 15, 2024",
  expected_graduation: "Dec 15, 2027",
};

// Set this to true to simulate outstanding balance (financial gate)
const HAS_BALANCE = true;
const BALANCE_AMOUNT = 1_250_000;

export default function StudentProfile() {
  const [showID, setShowID] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const getGradeClass = (cgpa: number) => {
    if (cgpa >= 4.5) return "First Class";
    if (cgpa >= 3.5) return "Second Class Upper";
    if (cgpa >= 2.4) return "Second Class Lower";
    if (cgpa >= 1.5) return "Third Class";
    if (cgpa >= 1.1) return "Pass";
    return "Fail";
  };
  const gradeClass = getGradeClass(student.cgpa);

  return (
    <main className="w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-on-surface">My Profile</h1>
        <p className="text-sm text-on-surface-variant mt-1">{student.faculty} · {student.campus}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column ─────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Identity Header Card */}
          <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full border-4 border-primary/20 overflow-hidden bg-primary/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.username}`}
                    alt={student.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-finance-success text-white p-1 rounded-full border-2 border-white shadow" title="Verified by Registry">
                  <CheckCircle2 size={14} />
                </div>
              </div>

              {/* Identity Info */}
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h2 className="text-3xl font-black text-on-surface">{student.full_name}</h2>
                  <span className="inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">Student</span>
                </div>
                <p className="text-base font-bold text-on-surface mb-1">{student.programme}</p>
                <p className="text-sm text-on-surface-variant mb-6">{student.faculty} · Year {student.year_of_study}</p>

                {/* Digital ID Banner */}
                <div className="flex flex-wrap gap-3">
                  <div
                    onClick={() => setShowID(true)}
                    className="inline-flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-border-subtle cursor-pointer hover:border-primary transition-colors group"
                  >
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-0.5">University Digital ID</p>
                      <p className="text-base font-mono font-black text-primary">{student.student_number}</p>
                    </div>
                    <div className="w-10 h-10 bg-white p-1 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <QrCode className="w-full h-full text-on-surface" />
                    </div>
                  </div>

                  <button
                    onClick={() => setShowID(true)}
                    className="bg-primary text-white px-5 py-4 rounded-xl font-bold flex flex-col items-center justify-center transition-all hover:opacity-90 active:scale-95 shadow-lg"
                  >
                    <IdCard size={20} className="mb-1 text-blue-200" />
                    <span className="text-[10px] uppercase">View Virtual ID</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Snapshot */}
          <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-sm">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
              <GraduationCap size={20} className="text-primary" /> Academic Snapshot
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant font-bold mb-1">CGPA</p>
                <p className="text-2xl font-black text-primary">{student.cgpa.toFixed(2)}</p>
                <p className="text-[10px] text-finance-success font-bold mt-1">{gradeClass}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant font-bold mb-1">CREDITS</p>
                <p className="text-2xl font-black text-on-surface">{student.credits_earned}</p>
                <p className="text-[10px] text-on-surface-variant font-bold mt-1">Earned</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant font-bold mb-1">SEMESTER</p>
                <p className="text-2xl font-black text-on-surface">{student.year_of_study}.{student.semester}</p>
                <p className="text-[10px] text-on-surface-variant font-bold mt-1">Current</p>
              </div>
            </div>
            {/* GPA Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>Progress to Graduation</span>
                <span>{Math.round((student.credits_earned / (student.credits_earned + student.credits_remaining)) * 100)}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.round((student.credits_earned / (student.credits_earned + student.credits_remaining)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <User size={20} className="text-primary" /> Personal Details
              </h3>
              <button
                onClick={() => { setEditMode(!editMode); if (!editMode) toast.info("Edit mode enabled — changes are local only in demo mode"); }}
                className="flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
              >
                <Edit3 size={14} /> {editMode ? "Cancel" : "Edit Details"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">University Email</p>
                  <p className="text-sm font-medium text-on-surface">{student.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Personal Email</p>
                  <p className="text-sm font-medium text-on-surface">{student.personal_email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Nationality</p>
                  <p className="text-sm font-medium text-on-surface">{student.nationality}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Mobile Number</p>
                  <p className="text-sm font-medium text-on-surface">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Emergency Contact</p>
                  <p className="text-sm font-medium text-on-surface">{student.emergency_contact}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Programme</p>
                  <p className="text-sm font-medium text-on-surface">{student.programme}</p>
                </div>
              </div>
            </div>
            {editMode && (
              <div className="mt-6 pt-6 border-t border-border-subtle">
                <button
                  onClick={() => { setEditMode(false); toast.success("Profile details updated successfully!"); }}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────────── */}
        <div className="space-y-8">

          {/* Financial Standing */}
          <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-sm">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-primary" /> Financial Standing
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Account Balance</span>
                <span className={`text-sm font-bold flex items-center gap-1 ${HAS_BALANCE ? "text-error" : "text-finance-success"}`}>
                  <span className={`w-2 h-2 rounded-full ${HAS_BALANCE ? "bg-error animate-pulse" : "bg-finance-success"}`}/>
                  {HAS_BALANCE ? "Outstanding" : "Paid"}
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${HAS_BALANCE ? "bg-error w-1/2" : "bg-finance-success w-full"} rounded-full`} />
              </div>
              <p className={`text-2xl font-black ${HAS_BALANCE ? "text-error" : "text-finance-success"}`}>
                {HAS_BALANCE ? `UGX ${BALANCE_AMOUNT.toLocaleString()}` : "CLEARED"}
              </p>
            </div>
            <button
              onClick={() => toast.info("Downloading financial statement...")}
              className="w-full py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Statement
            </button>
          </div>

          {/* Semester Roadmap */}
          <div className="bg-[#00174b] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Calendar size={20} className="text-blue-300" /> Semester Roadmap
            </h3>
            <ul className="space-y-6 text-sm mb-6">
              <li className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-blue-300 uppercase font-bold tracking-tight block">Mid-Sem Exams</span>
                  <span className="font-medium">April 15, 2026</span>
                </div>
                <CheckCircle2 size={18} className="text-finance-success opacity-70" />
              </li>
              <li className="flex justify-between items-center border-l-2 border-blue-400/30 pl-4">
                <div>
                  <span className="text-[10px] text-blue-300 uppercase font-bold tracking-tight block">Coursework Upload</span>
                  <span className="font-medium">May 20, 2026</span>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <span className={`text-[10px] ${HAS_BALANCE ? "text-error" : "text-blue-300"} uppercase font-bold tracking-tight block`}>Final Examinations</span>
                  <span className={`font-medium ${HAS_BALANCE ? "text-red-300" : ""}`}>June 10, 2026</span>
                </div>
                {HAS_BALANCE
                  ? <Lock size={18} className="text-error" />
                  : <span className="text-blue-300 text-lg">→</span>
                }
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-blue-300 uppercase font-bold tracking-tight block">End of Semester</span>
                  <span className="font-medium">June 25, 2026</span>
                </div>
                <span className="text-blue-300 text-lg">→</span>
              </li>
            </ul>
            {HAS_BALANCE && (
              <div className="bg-error/20 border border-error/30 rounded-xl p-4 text-center">
                <p className="text-[11px] text-red-300 font-bold">Clear your balance to unlock exam access</p>
              </div>
            )}
          </div>

          {/* Document Vault */}
          <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-sm">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
              <ShieldCheck size={20} className="text-primary" /> Document Vault
            </h3>
            <div className="space-y-3">
              <div
                onClick={() => toast.success("Downloading Admission Letter...")}
                className="flex items-center justify-between p-3 rounded-xl border border-border-subtle hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-on-surface-variant group-hover:text-primary" />
                  <span className="text-sm font-medium text-on-surface">Admission Letter</span>
                </div>
                <Download size={14} className="text-on-surface-variant" />
              </div>

              <div
                onClick={() => toast.success("Downloading Academic Transcript...")}
                className="flex items-center justify-between p-3 rounded-xl border border-border-subtle hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-on-surface-variant group-hover:text-primary" />
                  <span className="text-sm font-medium text-on-surface">Academic Transcript</span>
                </div>
                <Download size={14} className="text-on-surface-variant" />
              </div>

              {/* Exam Permit — Financial Gate */}
              <div
                onClick={() => HAS_BALANCE ? toast.error("Exam Permit locked — clear outstanding balance first.") : toast.success("Downloading Exam Permit...")}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors group cursor-pointer ${HAS_BALANCE ? "bg-error/5 border-error/20" : "border-border-subtle hover:bg-surface-container-low"}`}
              >
                <div className="flex items-center gap-3">
                  {HAS_BALANCE
                    ? <Lock size={18} className="text-error" />
                    : <Ticket size={18} className="text-on-surface-variant group-hover:text-primary" />
                  }
                  <span className={`text-sm font-medium ${HAS_BALANCE ? "text-error" : "text-on-surface"}`}>Exam Permit 2026</span>
                </div>
                {HAS_BALANCE
                  ? <span className="text-[9px] bg-error/10 text-error px-1.5 py-0.5 rounded-full font-black uppercase">LOCKED</span>
                  : <Download size={14} className="text-on-surface-variant" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Virtual ID Card Modal ───────────────────────────── */}
      {showID && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowID(false)} />
          <div className="relative w-full max-w-[320px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Navy Header */}
            <div className="bg-[#00174b] h-24 flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <p className="text-[10px] text-white font-black uppercase tracking-[0.2em]">Student Identification</p>
                <p className="text-[8px] text-blue-200 mt-0.5">Cavendish University Uganda</p>
              </div>
            </div>

            {/* ID Body */}
            <div className="p-8 -mt-12 text-center space-y-4">
              <div className="inline-block p-1 bg-white rounded-full shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.username}`}
                  alt={student.full_name}
                  className="w-24 h-24 rounded-full bg-gray-50 border-4 border-gray-100"
                />
              </div>

              <div>
                <h4 className="text-xl font-black text-[#00174b] leading-tight">{student.full_name}</h4>
                <p className="text-[10px] font-bold text-primary uppercase mt-1">{student.student_number}</p>
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl space-y-1.5 text-left">
                <div>
                  <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-wider">Course</p>
                  <p className="text-[11px] font-bold text-on-surface leading-tight">{student.programme}</p>
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-wider">Campus</p>
                    <p className="text-[11px] font-bold text-on-surface">{student.campus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-wider">Validity</p>
                    <p className="text-[9px] font-black text-finance-success">{student.enrolled_date} — {student.expected_graduation}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center py-1">
                <div className="p-2 bg-white rounded-xl shadow-inner border border-border-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`NAME: ${student.full_name}\nID: ${student.student_number}\nCOURSE: ${student.programme}\nCAMPUS: ${student.campus}\nVALID: ${student.enrolled_date} to ${student.expected_graduation}`)}`}
                    alt="Student QR Code"
                    className="w-24 h-24"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="w-2 h-2 bg-finance-success rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-[#00174b] uppercase tracking-widest">Active Student</span>
              </div>

              <p className="text-[8px] text-on-surface-variant font-medium leading-relaxed pt-2 border-t border-border-subtle">
                Official Virtual ID card for University entry and academic verification.
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowID(false)}
              className="absolute top-4 right-4 text-white hover:text-red-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
