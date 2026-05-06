"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Plus, FileText, UserCheck, FolderOpen, AlertCircle, FileDigit, FileSignature } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function AdmissionsDashboard() {
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const { students, enrollStudent } = useGlobalContext();

  const applicants = useMemo(
    () =>
      [...students]
        .sort(
          (a, b) =>
            new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime()
        )
        .map((student, index) => ({
          initials: student.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase() ?? "")
            .join(""),
          name: student.name,
          email: student.email,
          program: student.program,
          submittedAt: new Date(student.applied_at).toLocaleDateString("en-UG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: student.status,
          documents: ["N/A"],
          avatarClass:
            index % 3 === 0
              ? "bg-blue-100 text-blue-700"
              : index % 3 === 1
              ? "bg-slate-100 text-slate-700"
              : "bg-purple-100 text-purple-700",
        })),
    [students]
  );

  const programOptions = useMemo(
    () => ["All Programs", ...Array.from(new Set(applicants.map((applicant) => applicant.program)))],
    [applicants]
  );
  const statusOptions = useMemo(
    () => ["All Status", ...Array.from(new Set(applicants.map((applicant) => applicant.status)))],
    [applicants]
  );

  const filteredApplicants = useMemo(
    () =>
      applicants.filter((applicant) => {
        const matchProgram =
          programFilter === "All Programs" || applicant.program === programFilter;
        const matchStatus =
          statusFilter === "All Status" || applicant.status === statusFilter;
        return matchProgram && matchStatus;
      }),
    [applicants, programFilter, statusFilter]
  );

  const downloadApplicantsCsv = () => {
    const headers = [
      "Applicant Name",
      "Email",
      "Program",
      "Date Submitted",
      "Status",
      "Documents",
    ];

    const rows = filteredApplicants.map((applicant) => [
      applicant.name,
      applicant.email,
      applicant.program,
      applicant.submittedAt,
      applicant.status,
      applicant.documents.join(" | "),
    ]);

    const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((item) => quote(String(item))).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admissions-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Admissions report download started.");
  };

  return (
    <div className="p-lg space-y-lg max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-h1 text-h1 text-slate-900">Admissions Dashboard</h1>
          <p className="font-body-lg text-body-lg text-slate-500 mt-1">Cavendish University Uganda Central Portal</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadApplicantsCsv} className="bg-white border border-border-subtle px-4 py-2 rounded-lg font-button text-button text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download size={20} /> Export Report
          </button>
          <Link href="/admin/admissions/new-application" className="bg-primary text-white px-4 py-2 rounded-lg font-button text-button hover:opacity-90 flex items-center gap-2">
            <Plus size={20} /> New Application
          </Link>
        </div>
      </div>

      {/* Bento KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Applications */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle hover:border-blue-200 transition-colors group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Applications</p>
              <h3 className="text-4xl font-bold text-slate-900">403</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FileText size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-finance-success text-sm font-semibold flex items-center">+12.5%</span>
            <span className="text-slate-400 text-xs">from last semester</span>
          </div>
        </div>

        {/* Completed Registrations */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle hover:border-finance-success/30 transition-colors group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Completed Registrations</p>
              <h3 className="text-4xl font-bold text-slate-900">66</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-finance-success group-hover:bg-finance-success group-hover:text-white transition-all">
              <UserCheck size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-finance-success h-full w-[16%]"></div>
            </div>
            <span className="text-slate-500 text-xs font-medium whitespace-nowrap">16% Goal</span>
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle hover:border-exam-warning/30 transition-colors group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Pending Documents</p>
              <h3 className="text-4xl font-bold text-slate-900">20</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-exam-warning group-hover:bg-exam-warning group-hover:text-white transition-all">
              <FolderOpen size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-exam-warning">
            <AlertCircle size={16} />
            <span className="text-xs font-semibold">Immediate action required</span>
          </div>
        </div>
      </div>

      {/* Recent Applicants Section */}
      <div className="bg-white rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-h3 text-h3 text-slate-900">Recent Applicants</h3>
          <div className="flex items-center gap-2">
            <select
              className="border border-border-subtle rounded-lg text-sm bg-slate-50 focus:ring-primary px-3 py-2 outline-none"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              {programOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              className="border border-border-subtle rounded-lg text-sm bg-slate-50 focus:ring-primary px-3 py-2 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">APPLICANT NAME</th>
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">PROGRAM</th>
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">DATE SUBMITTED</th>
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">STATUS</th>
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">DOCUMENTS</th>
                <th className="px-6 py-3 font-table-header text-table-header text-slate-500">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApplicants.map((applicant, index) => (
                <tr key={`${applicant.email}-${index}`} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${applicant.avatarClass}`}>
                        {applicant.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{applicant.name}</p>
                        <p className="text-xs text-slate-500">{applicant.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{applicant.program}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{applicant.submittedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        applicant.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {applicant.documents.map((document, docIndex) => (
                        <div key={`${document}-${docIndex}`} title={document}>
                          {document.toLowerCase().endsWith(".pdf") ? (
                            <FileDigit className="text-slate-400 cursor-pointer hover:text-red-500" size={20} />
                          ) : (
                            <FileSignature className="text-slate-400 cursor-pointer hover:text-blue-500" size={20} />
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {applicant.status !== "Enrolled" && applicant.status !== "Completed" ? (
                        <button 
                          onClick={() => {
                            const student = students.find(s => s.email === applicant.email);
                            if (student) {
                              enrollStudent(student.id);
                              toast.success(`${applicant.name} has been admitted!`);
                            }
                          }}
                          className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold"
                        >
                          Admit
                        </button>
                      ) : (
                        <button onClick={() => toast.info("Loading application review...")} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing {filteredApplicants.length} entries</p>
          <div className="flex gap-1">
            <button onClick={() => toast.error('Already on first page')} className="px-3 py-1 border rounded hover:bg-slate-50 text-slate-600 text-sm">Prev</button>
            <button onClick={() => alert('Feature in development...')}  className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
            <button onClick={() => toast.info('Loading page 2...')} className="px-3 py-1 border rounded hover:bg-slate-50 text-slate-600 text-sm">2</button>
            <button onClick={() => toast.info('Loading page 3...')} className="px-3 py-1 border rounded hover:bg-slate-50 text-slate-600 text-sm">3</button>
            <button onClick={() => toast.info('Loading next page...')} className="px-3 py-1 border rounded hover:bg-slate-50 text-slate-600 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
