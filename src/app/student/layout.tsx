"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Wallet, BookOpen, User, Bell, CalendarDays, Award, Map, LogOut, Megaphone } from "lucide-react";
import { toast } from "sonner";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";
import DarkModeToggle from "@/components/DarkModeToggle";

const navItems = [
  { href: "/student/dashboard",  icon: Home,         label: "Dashboard" },
  { href: "/student/profile",    icon: User,         label: "My Profile" },
  { href: "/student/academics",  icon: BookOpen,     label: "Academics" },
  { href: "/student/results",    icon: Award,        label: "My Results" },
  { href: "/student/finance",    icon: Wallet,       label: "Finance" },
  { href: "/student/communication", icon: Megaphone, label: "Communication" },
  { href: "/student/roadmap",    icon: Map,          label: "Semester Roadmap" },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
            onClick={() => { toast.success("Logged out successfully"); router.push("/login"); }}
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
            <Bell
              onClick={() => toast.info("No new notifications")}
              className="text-white md:text-slate-600 cursor-pointer hover:opacity-70 transition-opacity"
              size={20}
            />
            <div
              onClick={() => { toast.success("Logged out"); router.push("/login"); }}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 md:border-border-subtle bg-primary/10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
              title="Logout"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=egabo_aaron`}
                alt="Student Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pt-20 md:pt-8 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 5).map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center py-1 w-full ${active ? "text-primary" : "text-slate-500"}`}>
              <Icon size={20} className={active ? "fill-primary/20" : ""} />
              <span className="text-[9px] font-medium mt-0.5">{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      <GlobalCalendarWidget isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} readOnly={true} />
    </div>
  );
}
