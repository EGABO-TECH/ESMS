"use client";

import { useState, useMemo } from "react";
import { Mail, Megaphone, Search, CheckCircle2, MessageSquare, X, Phone, AlertTriangle, BookOpen, Calendar, Info } from "lucide-react";
import { toast } from "sonner";

type Category = "Urgent" | "Events" | "Academic" | "General";
type FilterTab = "All" | "Unread" | "Urgent" | "Academic";

interface Announcement {
  id: number;
  title: string;
  sender: string;
  date: string;
  category: Category;
  content: string;
  read: boolean;
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Semester II Registration Deadline Extended",
    sender: "Registrar Office",
    date: "Oct 27, 2025",
    category: "Urgent",
    read: false,
    content: "Please be advised that the deadline for Semester II registration has been extended to November 15th, 2025. All students are required to complete their module selection and pay the applicable fees before this date. Failure to register will result in academic suspension for the upcoming semester. Contact the Registrar's office for assistance.",
  },
  {
    id: 2,
    title: "Inter-Faculty Sports Gala 2025",
    sender: "Dean of Students",
    date: "Oct 25, 2025",
    category: "Events",
    read: false,
    content: "Join us this Friday for the annual inter-faculty sports gala at the University Sports Ground. Events include football, volleyball, netball, and athletics. Various prizes to be won! Registration closes Thursday October 24th. Contact the Dean of Students office to register your faculty team.",
  },
  {
    id: 3,
    title: "New Library E-Resources Access",
    sender: "Library Department",
    date: "Oct 22, 2025",
    category: "Academic",
    read: false,
    content: "You can now access IEEE Xplore, JSTOR, and SpringerLink databases using your student credentials (student number + portal password). Log in at library.cavendish.ac.ug. These resources are available 24/7 and include millions of peer-reviewed articles, journals, and conference papers relevant to all programmes.",
  },
  {
    id: 4,
    title: "Campus Maintenance Alert",
    sender: "Facilities Management",
    date: "Oct 20, 2025",
    category: "General",
    read: true,
    content: "The student lounge (Block C, Ground Floor) will be closed for maintenance from October 22–24, 2025. The ICT lab in Block D will remain open as an alternative study space. We apologize for any inconvenience and appreciate your patience during these improvements.",
  },
  {
    id: 5,
    title: "Mid-Semester Examination Timetable Published",
    sender: "Academic Registrar",
    date: "Oct 18, 2025",
    category: "Academic",
    read: true,
    content: "The mid-semester examination timetable for Semester I 2025/2026 has been published on the student portal. All students are advised to check their personalized timetable under the Academics section. Ensure your financial clearance is in order at least 48 hours before your first examination to receive your exam permit.",
  },
  {
    id: 6,
    title: "Fee Payment Reminder — Avoid Exam Block",
    sender: "Bursar's Office",
    date: "Oct 15, 2025",
    category: "Urgent",
    read: true,
    content: "This is a reminder that all outstanding tuition and functional fees must be cleared before October 31, 2025. Students with an outstanding balance will be blocked from accessing exam permits, viewing results, and registering for Semester II modules. Payment can be made via bank transfer to Stanbic Bank or through mobile money. Contact bursar@cavendish.ac.ug for payment confirmation.",
  },
];

const CATEGORY_ICONS: Record<Category, JSX.Element> = {
  Urgent:   <Megaphone size={22} />,
  Events:   <Calendar size={22} />,
  Academic: <BookOpen size={22} />,
  General:  <Info size={22} />,
};

const CATEGORY_COLORS: Record<Category, string> = {
  Urgent:   "bg-error/10 text-error",
  Events:   "bg-purple-100 text-purple-600",
  Academic: "bg-primary/10 text-primary",
  General:  "bg-slate-100 text-slate-500",
};

const LEFT_BAR_COLORS: Record<Category, string> = {
  Urgent:   "bg-error",
  Events:   "bg-purple-500",
  Academic: "bg-primary",
  General:  "bg-slate-400",
};

const FILTER_TABS: FilterTab[] = ["All", "Unread", "Urgent", "Academic"];

export default function StudentCommunicationPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showSOS, setShowSOS] = useState(false);

  const unreadCount = announcements.filter(a => !a.read).length;

  const filtered = useMemo(() => {
    let list = announcements;
    if (activeFilter === "Unread")  list = list.filter(a => !a.read);
    if (activeFilter === "Urgent")  list = list.filter(a => a.category === "Urgent");
    if (activeFilter === "Academic") list = list.filter(a => a.category === "Academic");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.sender.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    }
    return list;
  }, [announcements, activeFilter, searchQuery]);

  const markRead = (id: number) =>
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));

  const markAllRead = () => {
    setAnnouncements(prev => prev.map(a => ({ ...a, read: true })));
    toast.success("All announcements marked as read.");
  };

  const openAnnouncement = (a: Announcement) => {
    markRead(a.id);
    setSelectedAnnouncement(a);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Communication Center</h1>
          <p className="text-slate-500 mt-1">Official announcements, notices, and correspondence from the university.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/10 transition-all self-start md:self-auto"
          >
            <CheckCircle2 size={14} />
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* ── Main Feed */}
        <div className="xl:col-span-3 space-y-6">

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === tab
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                  {tab === "Unread" && unreadCount > 0 && (
                    <span className="ml-1.5 bg-white/30 text-white px-1.5 py-0.5 rounded-full text-[9px] font-black">
                      {activeFilter === "Unread" ? filtered.length : unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary w-full sm:w-64 transition-shadow"
                placeholder="Search announcements..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Announcements List */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Search size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-500">No announcements found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your filter or search query.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(msg => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden ${
                    !msg.read ? "border-primary/30" : "border-slate-200"
                  }`}
                  onClick={() => openAnnouncement(msg)}
                >
                  {/* Left colour bar */}
                  <div className={`absolute left-0 top-0 w-1 h-full ${LEFT_BAR_COLORS[msg.category]}`} />

                  {/* Unread dot */}
                  {!msg.read && (
                    <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full" />
                  )}

                  <div className="flex justify-between items-start mb-3 pl-1">
                    <div className="flex gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${CATEGORY_COLORS[msg.category]}`}>
                        {CATEGORY_ICONS[msg.category]}
                      </div>
                      <div>
                        <h3 className={`font-bold group-hover:text-primary transition-colors ${!msg.read ? "text-slate-900" : "text-slate-700"}`}>
                          {msg.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{msg.sender} · {msg.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded hidden sm:block ${CATEGORY_COLORS[msg.category]}`}>
                      {msg.category}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 pl-1 line-clamp-2">{msg.content}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 pl-1" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => openAnnouncement(msg)}
                      className="text-xs font-bold text-primary hover:underline underline-offset-4"
                    >
                      Read More →
                    </button>
                    <button
                      onClick={() => { markRead(msg.id); toast.success("Marked as read"); }}
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-colors ${
                        msg.read ? "text-finance-success cursor-default" : "text-slate-400 hover:text-finance-success"
                      }`}
                    >
                      <CheckCircle2 size={14} className={msg.read ? "text-finance-success" : "text-slate-300"} />
                      {msg.read ? "Read" : "Mark as Read"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" /> Contact Support
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:support@cavendish.ac.ug"
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20 no-underline"
              >
                <Mail size={16} className="text-slate-400 group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">General Helpdesk</p>
                  <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">support@cavendish.ac.ug</p>
                </div>
              </a>
              <a
                href="mailto:bursar@cavendish.ac.ug"
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20 no-underline"
              >
                <Mail size={16} className="text-slate-400 group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Financial Inquiries</p>
                  <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">bursar@cavendish.ac.ug</p>
                </div>
              </a>
              <a
                href="tel:+256414531700"
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20 no-underline"
              >
                <Phone size={16} className="text-slate-400 group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">General Line</p>
                  <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">+256 414 531 700</p>
                </div>
              </a>
            </div>
          </div>

          {/* Emergency SOS */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">Emergency?</h3>
              <p className="text-white/70 text-xs mb-6 leading-relaxed">
                Contact campus security or emergency response immediately.
              </p>
              <button
                onClick={() => setShowSOS(true)}
                className="w-full py-3 bg-error text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                🆘 Emergency SOS
              </button>
            </div>
            <Megaphone size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* ── Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedAnnouncement(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`p-6 ${
              selectedAnnouncement.category === "Urgent" ? "bg-error" :
              selectedAnnouncement.category === "Academic" ? "bg-[#00174b]" :
              selectedAnnouncement.category === "Events" ? "bg-purple-700" :
              "bg-slate-800"
            } text-white`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70 block mb-2">
                    {selectedAnnouncement.category} Notice
                  </span>
                  <h3 className="text-xl font-bold leading-tight">{selectedAnnouncement.title}</h3>
                  <p className="text-white/70 text-xs mt-2">{selectedAnnouncement.sender} · {selectedAnnouncement.date}</p>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-white/70 hover:text-white shrink-0 mt-1"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <p className="text-sm text-slate-700 leading-relaxed">{selectedAnnouncement.content}</p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-finance-success font-bold">
                  <CheckCircle2 size={16} />
                  Marked as read
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-5 py-2.5 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Emergency SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSOS(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-error p-6 text-center text-white">
              <AlertTriangle size={40} className="mx-auto mb-3" />
              <h3 className="text-xl font-bold">Emergency Contacts</h3>
              <p className="text-red-100 text-xs mt-1">Cavendish University Uganda</p>
            </div>
            <button onClick={() => setShowSOS(false)} className="absolute top-4 right-4 text-white hover:text-red-200">
              <X size={22} />
            </button>
            <div className="p-6 space-y-4">
              <a href="tel:+256414531700" className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 hover:border-error/40 transition-colors group no-underline">
                <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-error uppercase tracking-wider">Security Office</p>
                  <p className="text-base font-black text-slate-900 group-hover:text-error">+256 414 531 700</p>
                </div>
              </a>
              <a href="tel:+256741242287" className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 hover:border-error/40 transition-colors group no-underline">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Emergency Hotline</p>
                  <p className="text-base font-black text-slate-900 group-hover:text-error">+256 741 242 287</p>
                </div>
              </a>
              <a href="tel:999" className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 hover:border-error/40 transition-colors group no-underline">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Police / Fire / Ambulance</p>
                  <p className="text-base font-black text-slate-900 group-hover:text-error">999 / 112</p>
                </div>
              </a>
              <p className="text-center text-[10px] text-slate-400 pt-2">Tap a number to call directly from your device</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
