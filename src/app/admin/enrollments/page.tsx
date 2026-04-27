"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  UserPlus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  ArrowRight,
  ClipboardCheck,
  XCircle,
  MoreHorizontal
} from "lucide-react";

import { MOCK_STUDENTS } from "@/lib/mockData";

export default function AdminEnrollmentsPage() {
  const [activeTab, setActiveTab] = useState("Pending");

  const enrollments = MOCK_STUDENTS.map((s, i) => ({
    id: `APP-990${i+1}`,
    name: s.name,
    program: s.program,
    date: s.applied_at.split('T')[0],
    status: s.status,
    avatar: s.name.charAt(0)
  }));


  const statusColors: Record<string, string> = {
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Review: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statusIcons: Record<string, any> = {
    Approved: <CheckCircle size={14} />,
    Pending: <Clock size={14} />,
    Review: <AlertCircle size={14} />,
    Rejected: <XCircle size={14} />,
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Administration</span>
            <ChevronRight size={10} />
            <span className="text-primary">Admissions Hub</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">Enrollment Portal</h1>
          <p className="text-slate-500 mt-1">Review and process student applications and program admissions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Initializing bulk approval...')} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <ClipboardCheck size={18} /> Bulk Process
          </button>
        </div>
      </div>

      {/* Tabs & Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
          {["All", "Pending", "Review", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab 
                ? "bg-[#00174b] text-white shadow-md" 
                : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-100 px-6 py-2.5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Total Approved</p>
            <p className="text-xl font-black text-emerald-900">790</p>
          </div>
          <UserPlus size={24} className="text-emerald-600" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          {/* List Area */}
          <div className="space-y-4">
            {enrollments.filter(e => activeTab === "All" || e.status === activeTab).map((enroll, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary/20 hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black text-lg border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                    {enroll.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{enroll.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400">ID: {enroll.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{enroll.program} · Applied {enroll.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${statusColors[enroll.status]}`}>
                    {statusIcons[enroll.status]}
                    {enroll.status}
                  </span>
                  
                  <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast.success('Application approved')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button onClick={() => toast.error('Application rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reject">
                      <XCircle size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
            Load Older Applications
          </button>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Enrollment Insights</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <UserPlus size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Highest Demand</p>
                  <p className="text-xs text-slate-500 mt-1">Software Engineering currently has 142 pending applications.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Average Review Time</p>
                  <p className="text-xs text-slate-500 mt-1">Applications are being processed within 2.4 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Documents Missing</p>
                  <p className="text-xs text-slate-500 mt-1">24 students have not yet uploaded their UNEB certificates.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-3 bg-[#00174b] text-white font-bold rounded-xl text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Run Eligibility Check <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Policy Manager</h4>
              <p className="text-slate-400 text-xs mb-6">Configure automated enrollment rules and capacity limits per program.</p>
              <button className="w-full py-3 bg-white text-slate-900 font-black rounded-xl text-sm hover:bg-blue-50 transition-all">
                Configure Rules
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <ClipboardCheck size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
