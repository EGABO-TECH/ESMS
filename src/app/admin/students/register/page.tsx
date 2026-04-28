"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

import { useGlobalContext } from "@/lib/GlobalContext";

const PROGRAM_OPTIONS = [
  "Software Engineering",
  "Data Science & AI",
  "Business Admin (BBA)",
  "Information Technology (BSIT)",
  "Laws (LLB)",
];

const STATUS_OPTIONS = ["Pending", "Enrolled", "Inactive"];

const YEAR_OPTIONS = ["1", "2", "3", "4"];
const SEM_OPTIONS = ["1", "2"];

type FormState = {
  name: string;
  email: string;
  program: string;
  year: string;
  sem: string;
  status: string;
  nationality: string;
  intake: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  program: PROGRAM_OPTIONS[0],
  year: YEAR_OPTIONS[0],
  sem: SEM_OPTIONS[0],
  status: "Pending",
  nationality: "Ugandan",
  intake: "Aug 2026",
};

const makeStudentId = () =>
  `CUU-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
    100 + Math.random() * 900
  )}`;

export default function RegisterStudentPage() {
  const router = useRouter();
  const { students, setStudents } = useGlobalContext();

  const [form, setForm] = useState<FormState>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const idPreview = useMemo(() => makeStudentId(), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    const emailExists = students.some(
      (student) => student.email.toLowerCase() === form.email.toLowerCase()
    );
    if (emailExists) {
      toast.error("A student account with this email already exists.");
      setIsSaving(false);
      return;
    }

    const nextStudent = {
      id: makeStudentId(),
      name: form.name.trim(),
      program: form.program,
      year: form.year,
      sem: form.sem,
      status: form.status,
      email: form.email.trim().toLowerCase(),
      nationality: form.nationality.trim(),
      applied_at: new Date().toISOString(),
      intake: form.intake.trim(),
    };

    setStudents((prev) => [nextStudent, ...prev]);
    toast.success("Student account created successfully.");
    router.push("/admin/students");
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Administration / Student Registry
          </p>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            Register New Student
          </h1>
          <p className="text-slate-500 mt-1">
            Create a student account that appears in the admin and registrar
            student directories.
          </p>
        </div>
        <Link
          href="/admin/students"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Full Name
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Jane Doe"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Student Email
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="jane.doe@students.cavendish.ac.ug"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Program
            </span>
            <select
              value={form.program}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, program: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              {PROGRAM_OPTIONS.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Year
            </span>
            <select
              value={form.year}
              onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Semester
            </span>
            <select
              value={form.sem}
              onChange={(e) => setForm((prev) => ({ ...prev, sem: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              {SEM_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Account Status
            </span>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Nationality
            </span>
            <input
              required
              value={form.nationality}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nationality: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ugandan"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Intake
            </span>
            <input
              required
              value={form.intake}
              onChange={(e) => setForm((prev) => ({ ...prev, intake: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Aug 2026"
            />
          </label>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Generated Student ID Preview
          </p>
          <p className="font-mono text-sm text-slate-700 mt-1">{idPreview}</p>
          <p className="text-xs text-slate-500 mt-1">
            A final unique ID is generated on submit.
          </p>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Link
            href="/admin/students"
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
