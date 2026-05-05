"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, ReactNode, useState } from "react";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Banknote, 
  CreditCard, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  CalendarDays,
  FileText,
  Users,
  PieChart
} from "lucide-react";
import GlobalCalendarWidget from "@/components/GlobalCalendarWidget";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useClerk } from "@clerk/nextjs";
import SidebarDeleteAccountButton from "@/components/SidebarDeleteAccountButton";

const navItems = [
  { href: "/finance", icon: LayoutDashboard, label: "Dashboard", mobileLabel: "Dashboard" },
  { href: "/finance/payments", icon: Banknote, label: "Payments", mobileLabel: "Payments" },
  { href: "/finance/billing", icon: FileText, label: "Billing", mobileLabel: "Billing" },
  { href: "/finance/ledgers", icon: CreditCard, label: "Ledgers", mobileLabel: "Ledgers" },
  { href: "/finance/payroll", icon: Users, label: "Staff Payroll", mobileLabel: "Payroll" },
  { href: "/finance/budget", icon: PieChart, label: "Budget Planning", mobileLabel: "Budget" },
  { href: "/finance/reports", icon: BarChart, label: "Reports", mobileLabel: "Reports" },
  { href: "/finance/settings", icon: Settings, label: "Settings", mobileLabel: "Settings" },
];

export default function FinanceLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
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
              <div className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                FINANCE PORTAL
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
          <Link href="/finance">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>
          <Link href="/finance/payments">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/payments' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <Banknote size={20} />
              <span className="font-medium">Payments</span>
            </div>
          </Link>
          <Link href="/finance/billing">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/billing' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <FileText size={20} />
              <span className="font-medium">Billing</span>
            </div>
          </Link>
          <Link href="/finance/ledgers">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/ledgers' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <CreditCard size={20} />
              <span className="font-medium">Ledgers</span>
            </div>
          </Link>
          <Link href="/finance/payroll">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/payroll' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <Users size={20} />
              <span className="font-medium">Staff Payroll</span>
            </div>
          </Link>
          <Link href="/finance/budget">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/budget' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <PieChart size={20} />
              <span className="font-medium">Budget Planning</span>
            </div>
          </Link>
          <Link href="/finance/reports">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/reports' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <BarChart size={20} />
              <span className="font-medium">Reports</span>
            </div>
          </Link>
          <Link href="/finance/settings">
            <div className={`mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${pathname === '/finance/settings' ? 'bg-emerald-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </div>
          </Link>
        </nav>

        <div className="mt-auto px-2 space-y-1 pt-4">
          <div 
            onClick={() => {
              toast.promise(new Promise(res => setTimeout(res, 800)), {
                loading: 'Connecting to support...',
                success: 'Live chat initiated with Treasury Support',
                error: 'Support offline'
              });
            }} 
            className="text-blue-200 hover:bg-white/10 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 active:scale-95 group"
          >
            <HelpCircle size={20} className="group-hover:text-white transition-colors" />
            <span className="font-medium group-hover:text-white">Support</span>
          </div>
          <div 
            onClick={() => {
              toast.info('Logging out of Finance Secure Session...');
              setTimeout(() => signOut({ redirectUrl: '/login' }), 1000);
            }} 
            className="text-red-400 hover:bg-red-500/10 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 active:scale-95 group"
          >
            <LogOut size={20} className="group-hover:text-red-300 transition-colors" />
            <span className="font-medium group-hover:text-red-300">Logout</span>
          </div>
          <SidebarDeleteAccountButton className="text-red-400 hover:bg-red-500/10 flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 active:scale-95" textClassName="font-medium" />
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 h-screen overflow-y-auto lg:ml-[280px] w-full pb-20 lg:pb-0">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-4 md:px-6 w-full sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-md active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Finance Office</h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">Treasury & Accounts</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all outline-none"
                placeholder="Search transactions, students..."
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <DarkModeToggle />
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-all active:scale-90 relative"
              >
                <CalendarDays size={20} />
              </button>
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(v => !v)}
                  className={`relative p-2 rounded-full transition-all active:scale-90 ${isNotifOpen ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-4 bg-[#00174b] text-white flex justify-between items-center">
                      <h4 className="font-bold text-sm">Finance Alerts</h4>
                      <span className="text-[10px] bg-emerald-500 px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      <div 
                        onClick={() => {
                          toast.info('Opening reconciliation module...');
                          setIsNotifOpen(false);
                        }} 
                        className="p-4 hover:bg-slate-50 transition-all flex gap-3 cursor-pointer group"
                      >
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg h-fit group-hover:scale-110 transition-transform">
                          <Banknote size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">MTN Batch Reconciliation</p>
                          <p className="text-[11px] text-slate-500 mt-1">MTN Mobile Money batch for yesterday needs verification.</p>
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <button className="text-[10px] font-bold text-emerald-600 hover:underline">Clear all notifications</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
              <div 
                onClick={() => toast.info('Redirecting to Profile Settings...')} 
                className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-lg transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">F</div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-900">Finance Manager</p>
                  <p className="text-[10px] text-slate-500">Main Campus Treasury</p>
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
              <Link key={href} href={href} className={`flex flex-col items-center justify-center py-1 px-3 min-w-[72px] ${active ? "text-emerald-600" : "text-slate-500"}`}>
                <Icon size={20} className={active ? "fill-emerald-600/20" : ""} />
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
