"use client";

import { Bell, Mail, Megaphone, Search, Filter, Clock, ChevronRight, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function StudentCommunicationPage() {
  const announcements = [
    { id: 1, title: "Semester II Registration Deadline Extended", sender: "Registrar Office", date: "Oct 27, 2025", category: "Urgent", content: "Please be advised that the deadline for Semester II registration has been extended to November 15th, 2025." },
    { id: 2, title: "Inter-Faculty Sports Gala 2025", sender: "Dean of Students", date: "Oct 25, 2025", category: "Events", content: "Join us this Friday for the annual sports gala. Various prizes to be won!" },
    { id: 3, title: "New Library E-Resources Access", sender: "Library Dept", date: "Oct 22, 2025", category: "Academic", content: "You can now access IEEE and JSTOR databases using your student credentials." },
    { id: 4, title: "Campus Maintenance Alert", sender: "Facilities", date: "Oct 20, 2025", category: "General", content: "The student lounge will be closed for maintenance from Oct 22-24." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Communication Center</h1>
          <p className="text-slate-500 mt-1">Official announcements, notices, and correspondence from the university.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold shadow-md">All Notices</button>
              <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Unread</button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary w-64" placeholder="Search announcements..." />
            </div>
          </div>

          <div className="space-y-4">
            {announcements.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-1 h-full ${msg.category === 'Urgent' ? 'bg-error' : 'bg-primary'}`} />
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${msg.category === 'Urgent' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                      {msg.category === 'Urgent' ? <Megaphone size={24} /> : <Mail size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{msg.title}</h3>
                      <p className="text-xs text-slate-400 font-medium">{msg.sender} · {msg.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                    msg.category === 'Urgent' ? 'bg-error/10 text-error' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {msg.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{msg.content}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <button onClick={() => toast.info('Full message details...')} className="text-xs font-bold text-primary hover:underline">Read More</button>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-slate-300" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Mark as Read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" /> Contact Support
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer group border border-transparent hover:border-primary/20">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">General Helpdesk</p>
                <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">support@cavendish.ac.ug</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer group border border-transparent hover:border-primary/20">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Financial Inquiries</p>
                <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">bursar@cavendish.ac.ug</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">Emergency?</h3>
              <p className="text-white/70 text-xs mb-6">Contact the campus security or emergency response team immediately.</p>
              <button onClick={() => toast.error('Emergency response notified')} className="w-full py-3 bg-error text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">
                Emergency SOS
              </button>
            </div>
            <Megaphone size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
