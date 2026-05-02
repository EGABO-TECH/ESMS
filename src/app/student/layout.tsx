"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Wallet, BookOpen, User, Bell, CalendarDays, Award, Map, LogOut, Megaphone, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useGlobalContext } from "@/lib/GlobalContext";
import { useUser, useClerk } from "@clerk/nextjs";

const NOTIFICATIONS = [
  { id: 1, type: "urgent", title: "Outstanding Balance", body: "UGX 1,250,000 due by May 27, 2026. Clear to unlock exam permit.", time: "2h ago", read: false },
  { id: 2, type: "info",   title: "Coursework Deadline Reminder", body: "Submit all assignments before May 20, 2026 at 23:59 EAT.", time: "1d ago", read: false },
  { id: 3, type: "success", title: "Mid-Semester Results Posted", body: "Your mid-semester results for SWE411 are now available.", time: "3d ago", read: true },
  { id: 4, type: "info",   title: "Registration Open", body: "Semester II module registration opens June 1, 2026.", time: "1w ago", read: true },
];

const navItems = [
  { href: "/student/dashboard",  icon: Home,         label: "Dashboard", mobileLabel: "Dashboard" },
  { href: "/student/profile",    icon: User,         label: "My Profile", mobileLabel: "Profile" },
  { href: "/student/academics",  icon: BookOpen,     label: "Academics", mobileLabel: "Academics" },
  { href: "/student/results",    icon: Award,        label: "My Results", mobileLabel: "Results" },
  { href: "/student/finance",    icon: Wallet,       label: "Finance", mobileLabel: "Finance" },
  { href: "/student/communication", icon: Megaphone, label: "Communication", mobileLabel: "Comms" },
  { href: "/student/roadmap",    icon: Map,          label: "Semester Roadmap", mobileLabel: "Roadmap" },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profileImage } = useGlobalContext();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const clerkName = isLoaded && user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "";
  const avatarUrl = user?.imageUrl || profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${clerkName || "egabo_aaron"}`;
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="bg-surface-bg text-on-surface flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-[#00174b] border-r border-slate-800 shadow-xl flex-col py-6 z-50">
        {/* Logo */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Cavendish University Uganda Logo" className="w-full h-full object-contain" src="/cuu-logo.png" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white leading-tight block">Cavendish</span>
            <span className="text-xl font-bold tracking-tight text-white leading-tight block">University</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${active ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                  <Icon size={20} />
                  <span className="font-medium text-sm">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 pt-4 border-t border-white/10">
          <div
            onClick={() => signOut({ redirectUrl: '/login' })}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto md:ml-[280px] w-full pb-20 md:pb-0">
        {/* Top Bar */}
        <header className="fixed md:sticky top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 h-16 bg-[#00174b] md:bg-white border-b border-slate-200 max-w-[2000px] mx-auto transition-colors">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Cavendish University Uganda Logo" className="w-full h-full object-contain" src="/cuu-logo.png" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Cavendish Univ.</span>
          </div>

          {/* Desktop Title */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Student Portal</h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="text-white md:text-primary md:bg-primary/10 md:hover:bg-primary/20 p-2 rounded-full transition-colors"
              title="School Calendar"
            >
              <CalendarDays size={20} />
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(v => !v)}
                className="relative text-white md:text-slate-600 hover:opacity-70 transition-opacity p-1"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[100] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                    <div className="flex items-center gap-3">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-[10px] font-bold text-primary hover:underline">Mark all read</button>
                      )}
                      <button onClick={() => setIsNotifOpen(false)}><X size={16} className="text-slate-400" /></button>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`flex gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50 ${!n.read ? "bg-primary/[0.02]" : ""}`}
                      >
                        <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          n.type === "urgent" ? "bg-error/10" : n.type === "success" ? "bg-finance-success/10" : "bg-primary/10"
                        }`}>
                          {n.type === "urgent" && <AlertCircle size={16} className="text-error" />}
                          {n.type === "success" && <CheckCircle2 size={16} className="text-finance-success" />}
                          {n.type === "info" && <Info size={16} className="text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-bold ${!n.read ? "text-slate-900" : "text-slate-600"} leading-tight`}>{n.title}</p>
                            {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-medium">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {unreadCount === 0 && (
                    <div className="px-5 py-6 text-center">
                      <CheckCircle2 size={24} className="text-finance-success mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-500">All caught up!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar → navigates to profile */}
            <div className="flex items-center gap-2">
              <Link
                href="/student/profile"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 md:border-border-subtle bg-primary/10 flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"
                title="My Profile"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="Student Profile"
                  className="w-full h-full object-cover"
                />
              </Link>
              
              {/* Mobile Logout */}
              <button
                onClick={() => signOut({ redirectUrl: '/login' })}
                className="md:hidden text-white/70 hover:text-white p-1"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pt-20 md:pt-8 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 h-16 bg-white/90 backdrop-blur-md border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl overflow-x-auto no-scrollbar">
        <div className="min-w-max flex items-center h-full px-2 gap-1">
        {navItems.map(({ href, icon: Icon, mobileLabel }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center py-1 px-3 min-w-[72px] rounded-xl transition-all ${active ? "text-primary bg-primary/5" : "text-slate-500 hover:text-slate-700"}`}>
              <Icon size={18} className={active ? "fill-primary/20 animate-pulse" : ""} />
              <span className={`text-[9px] font-black mt-1 uppercase tracking-tighter ${active ? "opacity-100" : "opacity-60"}`}>{mobileLabel}</span>
            </Link>
          );
        })}
        </div>
      </nav>

      <GlobalCalendarWidget isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} readOnly={true} />
    </div>
  );
}
