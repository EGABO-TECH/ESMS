"use client";

import { Settings, Bell, DollarSign, Wallet, Save, Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function FinanceSettingsPage() {
  const [activeTab, setActiveTab] = useState("accounts");

  const sections = [
    { id: "accounts", title: "Account Settings", icon: Wallet, desc: "Manage bank accounts and mobile money gateways." },
    { id: "fees", title: "Fee Structures", icon: DollarSign, desc: "Configure tuition rates and installment plans." },
    { id: "notifications", title: "Payment Alerts", icon: Bell, desc: "Configure automated SMS/Email reminders." },
    { id: "security", title: "Auth & Access", icon: Lock, desc: "Financial portal access controls and audit logging." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Finance Configuration</h1>
        <p className="text-slate-500 mt-1">Configure payment gateways, fee structures, and financial compliance rules.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group border ${
                activeTab === section.id 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-600/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === section.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'} transition-colors`}>
                <section.icon size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{section.title}</p>
                <p className={`text-[10px] truncate mt-0.5 ${activeTab === section.id ? 'text-white/70' : 'text-slate-400'}`}>
                  {section.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Configuration</h2>
              <button 
                onClick={() => {
                  toast.promise(new Promise(res => setTimeout(res, 1000)), {
                    loading: 'Saving configuration...',
                    success: 'Finance settings updated successfully',
                    error: 'Failed to save changes'
                  });
                }} 
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>

            {activeTab === 'accounts' && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg" alt="MTN" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">MTN Mobile Money Gateway</p>
                      <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Connected & Active</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.error('Gateway disconnection requires administrator approval.')}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest active:scale-90"
                  >
                    Disconnect
                  </button>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm text-blue-600 font-black italic group-hover:scale-105 transition-transform">
                      STANBIC
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Stanbic Bank Feed</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Last Sync: 1 hour ago</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.info('Redirecting to Stanbic OAuth portal...')}
                    className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest active:scale-90"
                  >
                    Re-Auth
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'accounts' && (
              <div className="py-20 text-center space-y-4">
                <Settings size={48} className="mx-auto text-slate-200 animate-spin-slow" />
                <p className="text-slate-500 font-bold">Module {activeTab} is ready for tailoring.</p>
                <p className="text-xs text-slate-400">Specify your custom rules to finalize this configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
