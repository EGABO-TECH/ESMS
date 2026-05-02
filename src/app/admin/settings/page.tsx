"use client";

import { Settings, Shield, Bell, Globe, Lock, Database, Save, ChevronRight, User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import DeleteAccountButton from "@/components/DeleteAccountButton";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const sections = [
    { id: "general", title: "General Settings", icon: Settings, desc: "Organization details, campus info, and system defaults." },
    { id: "security", title: "Security & Access", icon: Shield, desc: "Manage roles, permissions, and authentication rules." },
    { id: "notifications", title: "System Alerts", icon: Bell, desc: "Configure broadcast rules and automated notifications." },
    { id: "regional", title: "Regional & Localization", icon: Globe, desc: "Currency (UGX), timezone, and language settings." },
    { id: "database", title: "Data Management", icon: Database, desc: "Backup protocols, audit logs, and system maintenance." },
    { id: "account", title: "Personal Account", icon: User, desc: "Manage your personal profile and account data." },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">System Configuration</h1>
        <p className="text-slate-500 mt-1">Manage global system parameters and administrative preferences.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="xl:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group border ${
                activeTab === section.id 
                  ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === section.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'} transition-colors`}>
                <section.icon size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{section.title}</p>
                <p className={`text-[10px] truncate mt-0.5 ${activeTab === section.id ? 'text-white/70' : 'text-slate-400'}`}>
                  {section.desc}
                </p>
              </div>
              <ChevronRight size={16} className={`${activeTab === section.id ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Settings</h2>
              <button 
                onClick={() => toast.success('Settings updated successfully')}
                className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>

            <div className="p-8 space-y-8 max-w-2xl">
              {activeTab === 'general' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-semibold" defaultValue="Cavendish University Uganda" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Version</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-sm" defaultValue="v2.4.0-Enterprise" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Email</label>
                    <input type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all text-sm" defaultValue="admin@cavendish.ac.ug" />
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-4">Academic Periods</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Semester</p>
                        <p className="text-sm font-bold text-slate-900">Semester II, 2025</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-bold text-emerald-600">Active - Mid Sem</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl group hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex gap-4 items-center">
                      <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-primary shadow-sm">
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Require 2FA for all administrative accounts.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl group hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex gap-4 items-center">
                      <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-primary shadow-sm">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Strict Password Policy</p>
                        <p className="text-xs text-slate-500">Minimum 12 chars with special symbols.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900">Personal Information</h3>
                    <p className="text-sm text-slate-500">Update your profile information and manage your account.</p>
                  </div>
                  
                  {/* We can add profile form fields here later */}
                  
                  <div className="pt-6 border-t border-slate-100">
                    <DeleteAccountButton />
                  </div>
                </div>
              )}

              {activeTab !== 'general' && activeTab !== 'security' && activeTab !== 'account' && (
                <div className="py-12 text-center">
                  <Settings size={48} className="mx-auto text-slate-200 mb-4 animate-spin-slow" />
                  <p className="text-slate-500 font-bold">Module {activeTab} is ready for configuration.</p>
                  <p className="text-xs text-slate-400 mt-1">Additional settings for this section will be available in the next update.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
