"use client";

import { useParams, useRouter } from "next/navigation";
import { Printer, ChevronLeft, ShieldCheck, Activity, CreditCard, ArrowUpRight, Hash } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";


export default function LedgerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { transactions } = useGlobalContext();

  const item = transactions.find(t => t.id === id) || {
    id: id,
    student: "Unknown Student",
    amount: "UGX 0",
    date: new Date().toLocaleDateString(),
    method: "N/A",
    reference: "N/A",
    status: "Pending"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Ledger
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              <Printer size={20} />
              Print Entry
            </button>
          </div>
        </div>

        {/* Ledger Entry Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
          <div className="bg-emerald-600 p-8 sm:p-12 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">Ledger Transaction Entry</h1>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Verified Audit Trail</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <p className="text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-1">Transaction ID</p>
                <p className="text-xl font-black">{item.id}</p>
              </div>
              <div>
                <p className="text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-1">Date Logged</p>
                <p className="text-xl font-black">{item.date}</p>
              </div>
              <div>
                <p className="text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-1">Ledger Type</p>
                <p className="text-xl font-black">Credit (CR)</p>
              </div>
              <div>
                <p className="text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-1">System Status</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                   <p className="text-sm font-black uppercase">{item.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={16} /> Transaction Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-slate-500 font-bold">Source Student</span>
                      <span className="text-slate-900 font-black">{item.student}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-slate-500 font-bold">Account Head</span>
                      <span className="text-slate-900 font-black uppercase text-xs">Tuition & Fees Revenue</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-slate-500 font-bold">Reference Number</span>
                      <span className="text-slate-900 font-black font-mono">{item.reference}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CreditCard size={16} /> Payment Metadata
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs font-bold">Gateway:</span>
                      <span className="text-slate-900 text-xs font-black uppercase">{item.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs font-bold">Processing Time:</span>
                      <span className="text-slate-900 text-xs font-black">Instant</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs font-bold">Verification Hash:</span>
                      <span className="text-slate-900 text-[10px] font-black font-mono truncate max-w-[120px]">
                        sha256:8821x...9921a
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-6">
                    <ArrowUpRight size={24} />
                    <span className="text-xs font-black uppercase tracking-[4px]">Financial Credit</span>
                  </div>
                  <p className="text-slate-400 text-sm font-bold mb-2">Total Credit Amount</p>
                  <p className="text-5xl font-black text-white">{item.amount}</p>
                  <p className="text-slate-500 text-xs mt-4">This entry has been automatically reconciled with the institutional bank feed.</p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Signatory</p>
                      <p className="text-sm font-bold text-slate-300">Finance Comptroller</p>
                   </div>
                   <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center">
                      <Hash size={24} className="text-slate-700" />
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
               <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-relaxed">
                  Confidential Audit Document · ESMS Ledger Tracking System · Official Transaction Log ID: {item.id}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
