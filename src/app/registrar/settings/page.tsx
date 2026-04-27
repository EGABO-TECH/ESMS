"use client";

import { Settings, Shield, Bell, BookOpen, GraduationCap, Save, ChevronRight, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function RegistrarSettingsPage() {
  const [activeTab, setActiveTab] = useState("academic");

  const sections = [
    { id: "academic", title: "Academic Calendar", icon: BookOpen, desc: "Manage semester dates and registration windows." },
    { id: "enrollment", title: "Enrollment Rules", icon: UserCheck, desc: "Configure prerequisites and credit limits." },
    { id: "graduation", title: "Graduation Rules", icon: GraduationCap, desc: "Set CGPA requirements and final audit rules." },
    { id: "security", title: "Portal Security", icon: Shield, desc: "Registry access logs and permission management." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Registry Settings</h1>
        <p className="text-slate-500 mt-1">Configure academic policies, enrollment windows, and graduation criteria.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group border ${
                activeTab === section.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-600/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === section.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'} transition-colors`}>
                <section.icon size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{section.title}</p>
                <p className={`text-[10px] truncate mt-0.5 ${activeTab === section.id ? 'text-white/70' : 'text-slate-400'}`}>
                  {section.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Policy</h2>
              <button onClick={() => toast.success('Registry policies updated')} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semester Start Date</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-semibold" defaultValue="2025-09-01" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Late Registration Deadline</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-semibold" defaultValue="2025-09-30" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <BookOpen className="text-blue-600" size={24} />
                    <div>
                      <p className="font-bold text-slate-900">Current Session: Semester II, 2025</p>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Open for Registration</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">Modify Schedule</button>
                </div>
              </div>
            )}

            {activeTab !== 'academic' && (
              <div className="py-20 text-center space-y-4">
                <Settings size={48} className="mx-auto text-slate-200 animate-spin-slow" />
                <p className="text-slate-500 font-bold">Module {activeTab} is ready for policy definition.</p>
                <p className="text-xs text-slate-400">Specify institutional criteria to finalize this configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
