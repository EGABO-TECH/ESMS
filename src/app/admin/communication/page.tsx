"use client";

import { MessageSquare, Send, Mail, Bell, Users, Plus, ChevronRight, History, Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminCommunicationPage() {
  const [activeTab, setActiveTab] = useState<"broadcast" | "history">("broadcast");

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Communication Center</h1>
          <p className="text-slate-500 mt-1">Manage institutional broadcasts, SMS alerts, and internal announcements.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("broadcast")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'broadcast' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            New Broadcast
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Interface */}
        <div className="xl:col-span-2 space-y-6">
          {activeTab === 'broadcast' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Target Audience</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['All Students', 'All Staff', 'Finalists', 'Faculty Deans'].map(target => (
                    <button key={target} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all">
                      {target}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Broadcast Channel</label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-bold text-sm cursor-pointer">
                    <Mail size={18} /> Email
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 font-bold text-sm cursor-not-allowed">
                    <MessageSquare size={18} /> SMS (Configuring...)
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-bold text-sm cursor-pointer">
                    <Bell size={18} /> App Notification
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Line</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-semibold"
                  placeholder="e.g. Important: Semester II Exam Schedule Update"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Body</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm leading-relaxed"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">Save Draft</button>
                <button 
                  onClick={() => toast.success('Broadcast scheduled for delivery!')}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Send size={18} /> Send Broadcast
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><History size={20} /> Sent Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" placeholder="Search history..." />
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { title: "Mid-Semester Fee Reminder", to: "All Students", date: "2 hours ago", type: "Email + Push" },
                  { title: "Staff Meeting: New Portal Training", to: "All Academic Staff", date: "Yesterday", type: "Email" },
                  { title: "CUU Graduation 2024 Date", to: "Finalists", date: "3 days ago", type: "Multi-Channel" },
                  { title: "Emergency Campus Maintenance", to: "Main Campus Staff", date: "Oct 24", type: "SMS + Push" },
                ].map((msg, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{msg.title}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">To: {msg.to} · {msg.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400">{msg.date}</p>
                      <ChevronRight size={14} className="ml-auto text-slate-300 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats & Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" /> Delivery Reach
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Students</span>
                <span className="text-lg font-black text-slate-900">4,892</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Staff</span>
                <span className="text-lg font-black text-slate-900">248</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase">Success Rate</span>
                <span className="text-lg font-black text-emerald-500">99.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">Automated Rules</h3>
              <p className="text-white/70 text-xs mb-6">Setup triggers for fee reminders, results alerts, and event notifications.</p>
              <button onClick={() => toast.info('Opening Automation Center')} className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Plus size={16} /> Create Automation
              </button>
            </div>
            <MessageSquare size={100} className="absolute -right-4 -bottom-4 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
