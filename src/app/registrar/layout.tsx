"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect, ReactNode, useState } from "react";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  UserPlus, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  CalendarDays,
  GraduationCap,
  FileText
} from "lucide-react";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useClerk } from "@clerk/nextjs";

const navItems = [
  { href: "/registrar", icon: LayoutDashboard, label: "Dashboard", mobileLabel: "Dashboard" },
  { href: "/registrar/students", icon: Users, label: "Students", mobileLabel: "Students" },
  { href: "/registrar/courses", icon: BookOpen, label: "Courses", mobileLabel: "Courses" },
  { href: "/registrar/enrollments", icon: UserPlus, label: "Enrollments", mobileLabel: "Enroll" },
  { href: "/registrar/graduation", icon: GraduationCap, label: "Graduation", mobileLabel: "Graduation" },
  { href: "/registrar/transcripts", icon: FileText, label: "Transcripts", mobileLabel: "Transcripts" },
  { href: "/registrar/reports", icon: BarChart, label: "Reports", mobileLabel: "Reports" },
  { href: "/registrar/settings", icon: Settings, label: "Settings", mobileLabel: "Settings" },
];

export default function RegistrarLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="bg-[#f8fafc] text-slate-900 flex h-screen overflow-hidden font-public-sans antialiased">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`fixed left-0 top-0 h-screen w-[280px] bg-[#00174b] border-r border-blue-900 shadow-xl flex flex-col py-6 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-6 mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden bg-white rounded p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Cavendish University Uganda Logo"
                className="w-full h-full object-contain"
                src="/cuu-logo.png"
              />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight">Cavendish<br/>University</div>
              <div className="text-blue-300 text-[10px] uppercase tracking-widest font-bold mt-1">
                REGISTRAR PORTAL
              </div>
            </div>
          </div>
          <button 
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          <Link href="/registrar">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>
          <Link href="/registrar/students">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/students' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <Users size={20} />
              <span className="font-medium">Students</span>
            </div>
          </Link>
          <Link href="/registrar/courses">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/courses' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <BookOpen size={20} />
              <span className="font-medium">Courses</span>
            </div>
          </Link>
          <Link href="/registrar/enrollments">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/enrollments' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <UserPlus size={20} />
              <span className="font-medium">Enrollments</span>
            </div>
          </Link>
          <Link href="/registrar/graduation">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/graduation' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <GraduationCap size={20} />
              <span className="font-medium">Graduation</span>
            </div>
          </Link>
          <Link href="/registrar/transcripts">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/transcripts' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <FileText size={20} />
              <span className="font-medium">Transcripts</span>
            </div>
          </Link>
          <Link href="/registrar/reports">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/reports' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <BarChart size={20} />
              <span className="font-medium">Reports</span>
            </div>
          </Link>
          <Link href="/registrar/settings">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/registrar/settings' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </div>
          </Link>
        </nav>

        <div className="mt-auto px-2 space-y-1 pt-4">
          <div onClick={() => toast.info('Opening support widget...')} className="text-blue-200 hover:bg-white/10 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200">
            <HelpCircle size={20} />
            <span className="font-medium">Support</span>
          </div>
          <div onClick={() => signOut({ redirectUrl: '/login' })} className="text-red-400 hover:bg-red-500/10 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 h-screen overflow-y-auto lg:ml-[280px] w-full pb-20 lg:pb-0">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-4 md:px-6 w-full sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Registrar</h1>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">Academic Registry</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                placeholder="Search students, courses..."
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <DarkModeToggle />
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors relative"
              >
                <CalendarDays size={20} />
              </button>
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(v => !v)}
                  className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="p-4 bg-[#00174b] text-white flex justify-between items-center">
                      <h4 className="font-bold text-sm">Registry Notifications</h4>
                      <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded-full font-bold">5 NEW</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      <div className="p-4 hover:bg-slate-50 transition-all flex gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">New Enrollment Request</p>
                          <p className="text-[11px] text-slate-500 mt-1">Nancy Faida has applied for the BBA program.</p>
                        </div>
                      </div>
                      {/* Add more notification items as needed */}
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">R</div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-900">Registrar Office</p>
                  <p className="text-[10px] text-slate-500">Academic Affairs</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto w-full p-6">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile/Tablet) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 h-16 px-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
        <div className="min-w-max flex items-center h-full gap-1">
          {navItems.map(({ href, icon: Icon, mobileLabel }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={`flex flex-col items-center justify-center py-1 px-3 min-w-[72px] ${active ? "text-blue-600" : "text-slate-500"}`}>
                <Icon size={20} className={active ? "fill-blue-600/20" : ""} />
                <span className="text-[9px] font-medium mt-0.5">{mobileLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <GlobalCalendarWidget 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </div>
  );
}
