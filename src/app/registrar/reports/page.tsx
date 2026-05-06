// Registrar Reports and Custom Report Builder
"use client";

import { useState } from "react";
import { BarChart, FileText, Download, Search, Users, GraduationCap, Map, X, Check, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistrarReportsPage() {
  const { students, courses, studentResults, transcriptRequests, stats } = useGlobalContext();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const downloadCSV = (filename: string, headers: string[], rows: any[][]) => {
    const escapeValue = (value: any) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => escapeValue(value)).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded successfully`);
  };

  const reports = [
    { 
      id: 1, 
      title: "Complete Student Registry", 
      category: "Enrollment", 
      date: new Date().toLocaleDateString(), 
      type: "CSV",
      action: () => downloadCSV("student-registry", ["ID", "Name", "Program", "Year", "Status", "Email"], 
        students.map(s => [s.id, s.name, s.program, s.year, s.status, s.email]))
    },
    { 
      id: 2, 
      title: "Course Catalog Report", 
      category: "Academics", 
      date: new Date().toLocaleDateString(), 
      type: "CSV",
      action: () => downloadCSV("course-catalog", ["Code", "Name", "Faculty", "Lecturer", "Credits", "Status"], 
        courses.map(c => [c.code, c.name, c.faculty, c.lecturer, c.credits, c.status]))
    },
    { 
      id: 3, 
      title: "Student Academic Results", 
      category: "Grades", 
      date: new Date().toLocaleDateString(), 
      type: "CSV",
      action: () => downloadCSV("academic-results", ["Student ID", "Course", "Credits", "CW", "Exam", "Total", "Grade"], 
        studentResults.map(r => [r.studentId, r.name, r.credits, r.cw, r.exam, r.score, r.grade]))
    },
    { 
      id: 4, 
      title: "Transcript Request History", 
      category: "Services", 
      date: new Date().toLocaleDateString(), 
      type: "CSV",
      action: () => downloadCSV("transcript-requests", ["ID", "Student", "Program", "Service", "Status", "Date"], 
        transcriptRequests.map(r => [r.id, r.studentName, r.program, r.serviceType, r.status, r.date]))
    },
  ];

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Academic Reports</h1>
        <p className="text-slate-500 mt-1">Institutional data summaries for enrollment, academics, and student records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Students", val: students.length.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Courses", val: courses.filter(c => c.status === "Active").length.toString(), icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Transcript Requests", val: transcriptRequests.length.toString(), icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Academic Audits</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                placeholder="Search reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => report.action()}>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{report.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{report.category} · {report.date}</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); report.action(); }} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400">
                <Search size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm font-medium">No reports matching your search.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#00174b] rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-2">Custom Report Builder</h3>
            <p className="text-blue-200 text-xs mb-6">Create tailor-made datasets for specific institutional audits.</p>
            <button 
              onClick={() => setIsBuilderOpen(true)} 
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
            >
              Launch Builder
            </button>
          </div>
          <BarChart size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>

      {isBuilderOpen && (
        <ReportBuilderModal 
          onClose={() => setIsBuilderOpen(false)} 
          dataSources={{ students, courses, studentResults, transcriptRequests }}
          onDownload={downloadCSV}
        />
      )}
    </div>
  );
}

function ReportBuilderModal({ onClose, dataSources, onDownload }: any) {
  const sources = [
    { id: "students", label: "Student Records", icon: Users, fields: ["id", "name", "program", "year", "status", "email"] },
    { id: "courses", label: "Course Catalog", icon: GraduationCap, fields: ["code", "name", "faculty", "lecturer", "credits", "status"] },
    { id: "results", label: "Academic Results", icon: FileText, fields: ["studentId", "name", "credits", "cw", "exam", "score", "grade"] },
    { id: "requests", label: "Transcript Requests", icon: Map, fields: ["id", "studentName", "program", "serviceType", "status", "date"] },
  ];

  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [selectedFields, setSelectedFields] = useState<string[]>(sources[0].fields);

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleDownload = () => {
    const data = dataSources[selectedSource.id === "results" ? "studentResults" : selectedSource.id === "requests" ? "transcriptRequests" : selectedSource.id];
    const rows = data.map((item: any) => selectedFields.map(field => item[field]));
    onDownload(`custom-${selectedSource.id}-report`, selectedFields.map(f => f.toUpperCase()), rows);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-black text-slate-900">Custom Report Builder</h3>
            <p className="text-xs text-slate-500 mt-1">Configure your dataset for export</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">1. Select Data Source</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => {
                    setSelectedSource(source);
                    setSelectedFields(source.fields);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    selectedSource.id === source.id 
                    ? "border-blue-600 bg-blue-50 text-blue-600" 
                    : "border-slate-100 hover:border-slate-200 text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <source.icon size={24} className={selectedSource.id === source.id ? "scale-110" : "group-hover:scale-110 transition-transform"} />
                  <span className="text-[10px] font-bold text-center">{source.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">2. Select Fields to Include</label>
            <div className="flex flex-wrap gap-2">
              {selectedSource.fields.map(field => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    selectedFields.includes(field)
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {selectedFields.includes(field) ? <Check size={14} /> : <Plus size={14} />}
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Preview</span>
              <span className="text-[10px] font-bold text-blue-600">{selectedFields.length} Columns Selected</span>
            </div>
            <div className="flex items-center gap-2 overflow-hidden italic text-xs text-slate-400">
              {selectedFields.map((f, i) => (
                <span key={f} className="flex items-center gap-2 whitespace-nowrap">
                  {f} {i < selectedFields.length - 1 && <ChevronRight size={12} />}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
            Cancel
          </button>
          <button 
            onClick={handleDownload}
            disabled={selectedFields.length === 0}
            className="flex-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download size={18} /> Generate & Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
