"use client";

import { Settings, Shield, Bell, BookOpen, Save, User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";

export default function LecturerSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const sections = [
    { id: "profile", title: "Faculty Profile", icon: User, desc: "Update your name, photo and personal info." },
    { id: "courses", title: "Course Defaults", icon: BookOpen, desc: "Set default grading scales and submission rules." },
    { id: "notifications", title: "Alert Prefs", icon: Bell, desc: "Configure how you receive submission notifications." },
    { id: "security", title: "Security", icon: Shield, desc: "Update your institutional password and 2FA." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Faculty Settings</h1>
        <p className="text-slate-500 mt-1">Manage your academic profile and portal preferences.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group border ${
                activeTab === section.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-600/50"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  activeTab === section.id
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                } transition-colors`}
              >
                <section.icon size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{section.title}</p>
                <p
                  className={`text-[10px] truncate mt-0.5 ${
                    activeTab === section.id ? "text-white/70" : "text-slate-400"
                  }`}
                >
                  {section.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab === "profile" ? "Faculty Profile" : `${activeTab} Details`}
              </h2>
              {activeTab !== "profile" && (
                <button
                  onClick={() => toast.success("Lecturer settings updated")}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
              )}
            </div>

            {activeTab === "profile" && (
              <ProfileSettingsForm accentColor="indigo" />
            )}

            {activeTab !== "profile" && (
              <div className="py-20 text-center space-y-4">
                <Settings size={48} className="mx-auto text-slate-200 animate-spin-slow" />
                <p className="text-slate-500 font-bold">Module {activeTab} is ready for customisation.</p>
                <p className="text-xs text-slate-400">Specify your teaching preferences to finalize this configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
