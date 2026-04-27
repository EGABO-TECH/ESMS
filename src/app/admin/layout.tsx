"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  CalendarDays
} from "lucide-react";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();

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
            <div className="bg-blue-600 text-white rounded-md mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer">
              <LayoutDashboard size={20} />
              <span className="font-public-sans text-sm font-medium">Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/academics">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <GraduationCap size={20} />
              <span className="font-public-sans text-sm font-medium">Academics</span>
            </div>
          </Link>
          <Link href="/admin/admissions">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <UserPlus size={20} />
              <span className="font-public-sans text-sm font-medium">Admissions</span>
            </div>
          </Link>
          <Link href="/admin/finance">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <Banknote size={20} />
              <span className="font-public-sans text-sm font-medium">Finance (UGX)</span>
            </div>
          </Link>
          <Link href="/admin/registry">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <Users size={20} />
              <span className="font-public-sans text-sm font-medium">Registry</span>
            </div>
          </Link>
          <Link href="/admin/communication">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <MessageSquare size={20} />
              <span className="font-public-sans text-sm font-medium">Communication</span>
            </div>
          </Link>
          <Link href="/admin/reports">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
              <BarChart size={20} />
              <span className="font-public-sans text-sm font-medium">Reports</span>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="text-slate-400 hover:text-white mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200">
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
      <main className="flex-1 h-screen overflow-y-auto lg:ml-[280px] w-full">
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
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-colors relative"
                title="School Calendar"
              >
                <CalendarDays size={20} />
              </button>
              <button onClick={() => toast.info('No new notifications')} className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
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

      {/* Global Calendar Widget */}
      <GlobalCalendarWidget 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </div>
  );
}
