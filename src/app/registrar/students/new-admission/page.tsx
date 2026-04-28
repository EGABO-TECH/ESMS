"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
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

const YEAR_OPTIONS = ["1", "2", "3", "4"];
const SEM_OPTIONS = ["1", "2"];

type AdmissionFormState = {
  fullName: string;
  email: string;
  phoneNumber: string;
  program: string;
  year: string;
  sem: string;
  intake: string;
  nationality: string;
};

const initialState: AdmissionFormState = {
  fullName: "",
  email: "",
  phoneNumber: "+256 ",
  program: PROGRAM_OPTIONS[0],
  year: YEAR_OPTIONS[0],
  sem: SEM_OPTIONS[0],
  intake: "Aug 2026",
  nationality: "Ugandan",
};

const makeStudentId = () =>
  `CUU-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
    100 + Math.random() * 900
  )}`;

export default function NewAdmissionPage() {
  const router = useRouter();
  const { students, setStudents } = useGlobalContext();
  const [form, setForm] = useState<AdmissionFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAdmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const duplicateEmail = students.some(
      (student) => student.email.toLowerCase() === form.email.toLowerCase()
    );

    if (duplicateEmail) {
      toast.error("A student with this email already exists.");
      setIsSubmitting(false);
      return;
    }

    setStudents((prev) => [
      {
        id: makeStudentId(),
        name: form.fullName.trim(),
        program: form.program,
        year: form.year,
        sem: form.sem,
        status: "Pending",
        email: form.email.trim().toLowerCase(),
        phoneNumber: form.phoneNumber.trim(),
        nationality: form.nationality.trim(),
        applied_at: new Date().toISOString(),
        intake: form.intake.trim(),
      },
      ...prev,
    ]);

    toast.success("New admission submitted successfully.");
    router.push("/registrar/students");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Registry / Student Management
          </p>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            New Admission
          </h1>
          <p className="text-slate-500 mt-1">
            Capture required details and create a pending student record.
          </p>
        </div>
        <Link
          href="/registrar/students"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Records
        </Link>
      </div>

      <form
        onSubmit={submitAdmission}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Full Name
            </span>
            <input
              required
              value={form.fullName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. John Doe"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="john.doe@students.cavendish.ac.ug"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Phone Number
            </span>
            <input
              required
              value={form.phoneNumber}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="+256 700 000 000"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
            >
              {SEM_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Intake
            </span>
            <input
              required
              value={form.intake}
              onChange={(e) => setForm((prev) => ({ ...prev, intake: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Aug 2026"
            />
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Ugandan"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/registrar/students"
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            {isSubmitting ? "Submitting..." : "Submit Admission"}
          </button>
        </div>
      </form>
    </div>
  );
}
