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

const INTAKE_OPTIONS = ["Jan 2026", "May 2026", "Aug 2026"];

type ApplicationForm = {
  fullName: string;
  email: string;
  program: string;
  intake: string;
  nationality: string;
  phoneNumber: string;
};

const initialForm: ApplicationForm = {
  fullName: "",
  email: "",
  program: PROGRAM_OPTIONS[0],
  intake: INTAKE_OPTIONS[2],
  nationality: "Ugandan",
  phoneNumber: "",
};

const makeStudentId = () =>
  `CUU-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
    100 + Math.random() * 900
  )}`;

export default function NewApplicationPage() {
  const router = useRouter();
  const { students, setStudents } = useGlobalContext();
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const duplicateEmail = students.some(
      (student) => student.email.toLowerCase() === form.email.toLowerCase()
    );

    if (duplicateEmail) {
      toast.error("This email already has a student account.");
      setIsSubmitting(false);
      return;
    }

    setStudents((prev) => [
      {
        id: makeStudentId(),
        name: form.fullName.trim(),
        program: form.program,
        year: "1",
        sem: "1",
        status: "Pending",
        email: form.email.trim().toLowerCase(),
        nationality: form.nationality.trim(),
        applied_at: new Date().toISOString(),
        intake: form.intake,
      },
      ...prev,
    ]);

    toast.success("New admission application submitted.");
    router.push("/admin/admissions");
  };

  return (
    <div className="p-lg space-y-lg max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Administration / Admissions
          </p>
          <h1 className="font-h1 text-h1 text-slate-900 mt-2">
            New Admission Application
          </h1>
          <p className="font-body-lg text-body-lg text-slate-500 mt-1">
            Add the required applicant details to create a pending admission.
          </p>
        </div>
        <Link
          href="/admin/admissions"
          className="bg-white border border-border-subtle px-4 py-2 rounded-lg font-button text-button text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Admissions
        </Link>
      </div>

      <form
        onSubmit={submitApplication}
        className="bg-white border border-border-subtle rounded-xl p-6 space-y-5"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Jane Doe"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Email
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
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
              Intake
            </span>
            <select
              value={form.intake}
              onChange={(e) => setForm((prev) => ({ ...prev, intake: e.target.value }))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              {INTAKE_OPTIONS.map((intake) => (
                <option key={intake} value={intake}>
                  {intake}
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="+256 700 000 000"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Link
            href="/admin/admissions"
            className="px-4 py-2.5 border border-border-subtle rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2.5 rounded-lg font-button text-button hover:opacity-90 inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
