"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Wallet, BookOpen, User, Bell, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="bg-surface-bg text-on-surface flex h-screen overflow-hidden">
      {/* Desktop Sidebar (hidden on mobile, visible on md+) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-[#00174b] border-r border-slate-800 shadow-xl flex-col py-6 z-50">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded overflow-hidden">
            <img
              alt="Cavendish University Uganda Logo"
              className="w-full h-full object-contain"
              src="/cuu-logo.png"
            />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white leading-tight block">Cavendish</span>
            <span className="text-xl font-bold tracking-tight text-white leading-tight block">University</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2 mt-4 px-2">
          <Link href="/student/dashboard">
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${pathname === '/student/dashboard' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <Home size={22} />
              <span className="font-medium text-sm">Dashboard</span>
            </div>
          </Link>
          <Link href="/student/academics">
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${pathname === '/student/academics' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <BookOpen size={22} />
              <span className="font-medium text-sm">Academics</span>
            </div>
          </Link>
          <Link href="/student/finance">
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${pathname === '/student/finance' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <Wallet size={22} />
              <span className="font-medium text-sm">Finance</span>
            </div>
          </Link>
          <Link href="/student/profile">
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${pathname === '/student/profile' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <User size={22} />
              <span className="font-medium text-sm">Profile</span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 h-screen overflow-y-auto md:ml-[280px] w-full pb-20 md:pb-0">
        {/* Top Bar (Mobile visible, Desktop specialized) */}
        <header className="fixed md:sticky top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 h-16 bg-[#00174b] md:bg-white border-b border-slate-200 dark:border-slate-800 max-w-[2000px] mx-auto transition-colors">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded">
              <img
                alt="Cavendish University Uganda Logo"
                className="w-full h-full object-contain"
                src="/cuu-logo.png"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Cavendish Univ.</span>
          </div>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Student Portal</h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCalendarOpen(true)}
              className="text-white md:text-primary md:bg-primary/10 md:hover:bg-primary/20 p-2 rounded-full transition-colors"
              title="School Calendar"
            >
              <CalendarDays size={20} />
            </button>
            <Bell onClick={() => toast.info('No new notifications')} className="text-white md:text-slate-600 cursor-pointer" size={20} />
            <div onClick={() => { toast.success('Logged out'); router.push('/login'); }} className="w-8 h-8 rounded-full overflow-hidden border border-border-subtle bg-white flex items-center justify-center text-primary font-bold shadow-sm cursor-pointer hover:bg-slate-50 transition-colors" title="Logout">
              KA
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="pt-20 md:pt-8 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe px-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Link href="/student/dashboard" className={`flex flex-col items-center justify-center py-1 w-full ${pathname === '/student/dashboard' ? 'text-primary' : 'text-slate-500'}`}>
          <Home size={22} className={pathname === '/student/dashboard' ? 'fill-primary/20' : ''} />
          <span className="font-public-sans text-[10px] font-medium mt-1">Home</span>
        </Link>
        <Link href="/student/finance" className={`flex flex-col items-center justify-center py-1 w-full ${pathname === '/student/finance' ? 'text-primary' : 'text-slate-500'}`}>
          <Wallet size={22} className={pathname === '/student/finance' ? 'fill-primary/20' : ''} />
          <span className="font-public-sans text-[10px] font-medium mt-1">Finance</span>
        </Link>
        <Link href="/student/academics" className={`flex flex-col items-center justify-center py-1 w-full ${pathname === '/student/academics' ? 'text-primary' : 'text-slate-500'}`}>
          <BookOpen size={22} className={pathname === '/student/academics' ? 'fill-primary/20' : ''} />
          <span className="font-public-sans text-[10px] font-medium mt-1">Academics</span>
        </Link>
        <Link href="/student/profile" className={`flex flex-col items-center justify-center py-1 w-full ${pathname === '/student/profile' ? 'text-primary' : 'text-slate-500'}`}>
          <User size={22} className={pathname === '/student/profile' ? 'fill-primary/20' : ''} />
          <span className="font-public-sans text-[10px] font-medium mt-1">Profile</span>
        </Link>
      </nav>

      <GlobalCalendarWidget 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        readOnly={true}
      />
    </div>
  );
}
