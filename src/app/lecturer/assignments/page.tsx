"use client";

import { useState, useMemo, useRef } from "react";
import { toast } from "sonner";
import {
  ClipboardList, Plus, Search, CheckCircle, Users, Download,
  X, Save, Eye, FileText, Clock, AlertCircle
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";



const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "Closing Soon": "bg-amber-100 text-amber-700",
  Grading: "bg-blue-100 text-blue-700",
  Draft: "bg-slate-100 text-slate-500",
  Closed: "bg-red-100 text-red-600",
};

export default function LecturerAssignmentsPage() {
  const { courses, students, assignments, setAssignments } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [viewAssignment, setViewAssignment] = useState<typeof assignments[0] | null>(null);
  const nextId = useRef(assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1);

  // Form state
  const [form, setForm] = useState({
    title: "", course: courses[0]?.code ?? "", dueDate: "", maxMarks: "100",
    instructions: "", status: "Active" as typeof assignments[0]["status"],
  });

  const filtered = useMemo(() =>
    assignments.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.course.toLowerCase().includes(search.toLowerCase())
    ), [assignments, search]);

  const stats = useMemo(() => ({
    pending: assignments.filter(a => a.status === "Grading").reduce((s, a) => s + (a.total - a.submissions), 0),
    active: assignments.filter(a => a.status === "Active").reduce((s, a) => s + a.submissions, 0),
    avg: Math.round(assignments.reduce((s, a) => s + (a.submissions / a.total) * 100, 0) / assignments.length),
  }), [assignments]);

  const handleCreate = () => {
    if (!form.title.trim() || !form.dueDate) {
      toast.error("Please fill in the title and due date."); return;
    }
    const course = courses.find(c => c.code === form.course);
    const newA = {
      id: nextId.current++,
      title: form.title.trim(),
      course: form.course,
      dueDate: form.dueDate,
      maxMarks: Number(form.maxMarks) || 100,
      instructions: form.instructions.trim(),
      submissions: 0,
      total: course?.students ?? 30,
      status: form.status,
    };
    setAssignments(prev => [newA, ...prev]);
    setShowCreate(false);
    setForm({ title: "", course: courses[0]?.code ?? "", dueDate: "", maxMarks: "100", instructions: "", status: "Active" });
    toast.success(`Assignment "${newA.title}" created for ${newA.course}!`);
  };

  const exportCSV = () => {
    const header = ["ID", "Title", "Course", "Due Date", "Max Marks", "Submissions", "Total Students", "Submission Rate", "Status"];
    const rows = assignments.map(a => [
      a.id, `"${a.title}"`, a.course, a.dueDate, a.maxMarks, a.submissions, a.total,
      `${((a.submissions / a.total) * 100).toFixed(1)}%`, a.status
    ]);
    const csv = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url;
    link.download = `assignments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click(); URL.revokeObjectURL(url);
    toast.success("Assignments exported to CSV.");
  };

  const downloadSubmissionReport = (a: typeof assignments[0]) => {
    const header = ["Student ID", "Student Name", "Assignment", "Course", "Due Date", "Status"];
    const rows = students.slice(0, a.submissions).map((s, i) => [
      s.id, `"${s.name}"`, `"${a.title}"`, a.course, a.dueDate,
      i < a.submissions ? "Submitted" : "Pending"
    ]);
    const csv = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url;
    link.download = `submissions-${a.course}-${a.id}.csv`;
    link.click(); URL.revokeObjectURL(url);
    toast.success("Submission report downloaded.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Assignment Manager</h1>
          <p className="text-slate-500 mt-1">Create, track, and manage student assignments across your active courses.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportCSV} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <Plus size={18} /> New Assignment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pending Grading", val: stats.pending.toString(), icon: ClipboardList, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active Submissions", val: stats.active.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Submission Rate", val: `${stats.avg}%`, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}><s.icon size={24} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">All Assignments ({filtered.length})</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text"
              className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-48"
              placeholder="Search assignments..." />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <AlertCircle size={36} className="mx-auto mb-3 text-slate-200" />
            <p className="text-slate-400 font-bold text-sm">No assignments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Submissions</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{a.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Max: {a.maxMarks} marks</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg">{a.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={12} />
                        {new Date(a.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs font-bold text-slate-700">{a.submissions}/{a.total}</p>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                        </div>
                        <p className="text-[9px] text-slate-400">{((a.submissions / a.total) * 100).toFixed(0)}%</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${STATUS_STYLES[a.status] ?? STATUS_STYLES.Draft}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setViewAssignment(a)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => downloadSubmissionReport(a)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Download Report">
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">New Assignment</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fill in the details below to create and publish.</p>
              </div>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  placeholder="e.g. System Design Proposal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course *</label>
                  <select value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-semibold">
                    {courses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Marks</label>
                  <input type="number" value={form.maxMarks} onChange={e => setForm(f => ({ ...f, maxMarks: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                    min={1} max={100} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date *</label>
                  <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-semibold" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as typeof assignments[0]["status"] }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-semibold">
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructions</label>
                <textarea value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))}
                  rows={3} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Describe what students need to submit..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleCreate} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2">
                <Save size={16} /> Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Details Modal */}
      {viewAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">{viewAssignment.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{viewAssignment.course} · Due {new Date(viewAssignment.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <button onClick={() => setViewAssignment(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Max Marks", value: viewAssignment.maxMarks },
                  { label: "Submissions", value: `${viewAssignment.submissions}/${viewAssignment.total}` },
                  { label: "Rate", value: `${((viewAssignment.submissions / viewAssignment.total) * 100).toFixed(0)}%` },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-xl font-black text-slate-900">{s.value}</p>
                  </div>
                ))}
              </div>
              {viewAssignment.instructions && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructions</p>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 leading-relaxed">
                    {viewAssignment.instructions}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Submissions</p>
                <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-xl">
                  {students.slice(0, viewAssignment.total).map((s, i) => (
                    <div key={s.id} className="flex items-center justify-between px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black">{s.name.charAt(0)}</div>
                        <span className="text-xs font-bold text-slate-700">{s.name}</span>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${i < viewAssignment.submissions ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                        {i < viewAssignment.submissions ? "Submitted" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
              <button onClick={() => { downloadSubmissionReport(viewAssignment); setViewAssignment(null); }}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 flex items-center gap-2">
                <Download size={16} /> Download Report
              </button>
              <button onClick={() => setViewAssignment(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2">
                <FileText size={16} /> Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
