"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  GraduationCap, 
  UserPlus, 
  Banknote, 
  Users, 
  MessageSquare, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  CalendarDays,
  BookOpen
} from "lucide-react";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";
import DarkModeToggle from "@/components/DarkModeToggle";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/students", icon: Users, label: "Students" },
  { href: "/admin/courses", icon: BookOpen, label: "Academics" },
  { href: "/admin/admissions", icon: UserPlus, label: "Admissions" },
  { href: "/admin/enrollments", icon: GraduationCap, label: "Enrollments" },
  { href: "/admin/grades", icon: BarChart, label: "Grades Center" },
  { href: "/admin/finance", icon: Banknote, label: "Finance" },
  { href: "/admin/registry", icon: Users, label: "Registry" },
  { href: "/admin/users", icon: Users, label: "Staff & Users" },
  { href: "/admin/communication", icon: MessageSquare, label: "Communication" },
  { href: "/admin/reports", icon: BarChart, label: "Reports" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const router = useRouter();
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
    <div className="bg-surface-bg text-on-surface flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`fixed left-0 top-0 h-screen w-[280px] bg-slate-900 border-r border-slate-800 shadow-xl flex flex-col py-6 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-6 mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden bg-white rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Cavendish University Uganda Logo"
                className="w-full h-full object-contain"
                src="/cuu-logo.png"
              />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight">Cavendish<br/>University</div>
              <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                WHERE YOUR FUTURE IS CALCULATED
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
          <Link href="/admin">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <LayoutDashboard size={20} />
              <span className="font-public-sans text-sm font-medium">Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/students">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/students' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <Users size={20} />
              <span className="font-public-sans text-sm font-medium">Students</span>
            </div>
          </Link>
          <Link href="/admin/courses">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/courses' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <BookOpen size={20} />
              <span className="font-public-sans text-sm font-medium">Academics</span>
            </div>
          </Link>
          <Link href="/admin/admissions">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/admissions' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <UserPlus size={20} />
              <span className="font-public-sans text-sm font-medium">Admissions</span>
            </div>
          </Link>
          <Link href="/admin/enrollments">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/enrollments' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <GraduationCap size={20} />
              <span className="font-public-sans text-sm font-medium">Enrollments</span>
            </div>
          </Link>
          <Link href="/admin/grades">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/grades' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <BarChart size={20} />
              <span className="font-public-sans text-sm font-medium">Grades Center</span>
            </div>
          </Link>
          <Link href="/admin/finance">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/finance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <Banknote size={20} />
              <span className="font-public-sans text-sm font-medium">Finance (UGX)</span>
            </div>
          </Link>
          <Link href="/admin/registry">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/registry' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <Users size={20} />
              <span className="font-public-sans text-sm font-medium">Registry</span>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/users' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <Users size={20} />
              <span className="font-public-sans text-sm font-medium">Staff & Users</span>
            </div>
          </Link>
          <Link href="/admin/communication">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/communication' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <MessageSquare size={20} />
              <span className="font-public-sans text-sm font-medium">Communication</span>
            </div>
          </Link>
          <Link href="/admin/reports">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/reports' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <BarChart size={20} />
              <span className="font-public-sans text-sm font-medium">Reports</span>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-all duration-200 ${pathname === '/admin/settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <Settings size={20} />
              <span className="font-public-sans text-sm font-medium">Settings</span>
            </div>
          </Link>
        </nav>

        <div className="mt-auto px-2 space-y-1 pt-4">
          <div onClick={() => toast.info('Opening support widget...')} className="text-slate-400 hover:text-white flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
            <HelpCircle size={20} />
            <span className="font-public-sans text-sm font-medium">Support</span>
          </div>
          <div onClick={() => { toast.success('Logged out successfully'); router.push('/login'); }} className="text-slate-400 hover:text-white flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
            <LogOut size={20} />
            <span className="font-public-sans text-sm font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 h-screen overflow-y-auto lg:ml-[280px] w-full pb-20 lg:pb-0">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-4 md:px-6 w-full sticky top-0 z-30 bg-white border-b border-slate-200 font-public-sans antialiased max-w-[2000px] mx-auto">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Administrator</h1>
              <span className="px-2 py-0.5 bg-surface-container text-[10px] font-bold text-outline rounded uppercase tracking-wider">Superuser</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                placeholder="Search student ID, staff..."
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <DarkModeToggle />
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-colors relative"
                title="School Calendar"
              >
                <CalendarDays size={20} />
              </button>
              {/* Notifications Dropdown */}
              <div className="relative hidden sm:block" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(v => !v)}
                  className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white" />
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-border-subtle overflow-hidden z-50">
                    <div className="p-4 bg-[#00174b] text-white flex justify-between items-center">
                      <h4 className="font-bold text-sm">System Alerts</h4>
                      <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded-full font-bold uppercase">3 New</span>
                    </div>
                    <div className="divide-y divide-border-subtle max-h-80 overflow-y-auto">
                      <div className="p-4 hover:bg-slate-50 transition-all flex gap-3">
                        <div className="p-2 bg-error/10 text-error rounded-lg h-fit shrink-0">
                          <Bell size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Financial Alert</p>
                          <p className="text-[11px] text-slate-500 mt-1">14 students have outstanding balances due by May 18. Exam permits blocked.</p>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-all flex gap-3">
                        <div className="p-2 bg-finance-success/10 text-finance-success rounded-lg h-fit shrink-0">
                          <Bell size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">New Academic Results</p>
                          <p className="text-[11px] text-slate-500 mt-1">Semester 1 provisional results uploaded for SWE311 &amp; SWE312.</p>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-all flex gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg h-fit shrink-0">
                          <Bell size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Submission Portal Active</p>
                          <p className="text-[11px] text-slate-500 mt-1">Assignment portal for COM211 is now open. 47 submissions received.</p>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-all flex gap-3">
                        <div className="p-2 bg-exam-warning/10 text-exam-warning rounded-lg h-fit shrink-0">
                          <Bell size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">3 New Admissions</p>
                          <p className="text-[11px] text-slate-500 mt-1">3 new applications pending review in the Admissions portal.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-border-subtle text-center">
                      <button
                        onClick={() => { setIsNotifOpen(false); toast.info("Loading all notifications..."); }}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => toast.info('Help documentation opened')} className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
                <HelpCircle size={20} />
              </button>
              <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
              <div onClick={() => toast.info('Profile settings opened')} className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold">A</div>
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-slate-900">Aaron M.</p>
                  <p className="text-[10px] text-slate-500">Main Campus</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[2000px] mx-auto w-full">
          {children}
        </div>

        <footer className="p-lg mt-xl text-center border-t border-slate-200 pb-8 max-w-[2000px] mx-auto">
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">© {new Date().getFullYear()} Enterprise School Management System</p>
        </footer>
      </main>

      {/* Bottom Nav (Mobile/Tablet) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 h-16 px-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
        <div className="min-w-max flex items-center h-full gap-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={`flex flex-col items-center justify-center py-1 px-3 min-w-[72px] ${active ? "text-primary" : "text-slate-500"}`}>
                <Icon size={20} className={active ? "fill-primary/20" : ""} />
                <span className="text-[9px] font-medium mt-0.5">{label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Global Calendar Widget */}
      <GlobalCalendarWidget 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </div>
  );
}
