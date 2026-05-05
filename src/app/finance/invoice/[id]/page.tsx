"use client";

import { useParams, useRouter } from "next/navigation";
import { Printer, ChevronLeft, Download, User, Calendar, CreditCard } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { toast } from "sonner";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { transactions } = useGlobalContext();

  // Find the invoice/transaction in global state or fallback to mock
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
        {/* Navigation - Hidden on print */}
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Billing
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => toast.info("Downloading PDF version...")}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download size={20} />
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-lg"
            >
              <Printer size={20} />
              Print Invoice
            </button>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
          {/* Header */}
          <div className="bg-slate-900 p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-2xl text-white">
                  E
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">EGABO TECH</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Finance Department</p>
                </div>
              </div>
              <div className="text-slate-400 text-sm space-y-1">
                <p>123 University Drive, Kampala</p>
                <p>finance@egabo-tech.ac.ug</p>
                <p>+256 700 000 000</p>
              </div>
            </div>
            <div className="text-right flex flex-col justify-between items-end">
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">Official Invoice</span>
              </div>
              <div className="mt-4">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Invoice Number</p>
                <p className="text-3xl font-black text-white">{item.id}</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Bill To</span>
                </div>
                <p className="text-lg font-black text-slate-900">{item.student}</p>
                <p className="text-slate-500 text-sm">Student ID: CUU-ST-00{Math.floor(Math.random() * 100)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Issue Date</span>
                </div>
                <p className="text-lg font-black text-slate-900">{item.date}</p>
                <p className="text-slate-500 text-sm">Due: Immediate</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <CreditCard size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Payment Method</span>
                </div>
                <p className="text-lg font-black text-slate-900">{item.method}</p>
                <p className="text-slate-500 text-sm">Ref: {item.reference}</p>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                    <th className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                    <th className="py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</th>
                    <th className="py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-6">
                      <p className="font-bold text-slate-900">Tuition Fees - Semester 1</p>
                      <p className="text-xs text-slate-500 mt-1">Academic Year 2025/2026</p>
                    </td>
                    <td className="py-6 text-center font-bold text-slate-600">1</td>
                    <td className="py-6 text-right font-bold text-slate-600">{item.amount}</td>
                    <td className="py-6 text-right font-black text-slate-900">{item.amount}</td>
                  </tr>
                  <tr>
                    <td className="py-6">
                      <p className="font-bold text-slate-900">Registration & Admin Fees</p>
                      <p className="text-xs text-slate-500 mt-1">Standard institutional processing</p>
                    </td>
                    <td className="py-6 text-center font-bold text-slate-600">1</td>
                    <td className="py-6 text-right font-bold text-slate-600">UGX 150,000</td>
                    <td className="py-6 text-right font-black text-slate-900">UGX 150,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex flex-col items-end pt-8 border-t border-slate-200">
              <div className="w-full sm:w-64 space-y-3">
                <div className="flex justify-between text-slate-500">
                  <span className="font-bold">Subtotal</span>
                  <span className="font-bold text-slate-900">{item.amount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span className="font-bold">VAT (0%)</span>
                  <span className="font-bold text-slate-900">UGX 0</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-slate-100">
                  <span className="text-lg font-black text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-emerald-600">{item.amount}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-8 items-start">
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Payment Status</h3>
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
                  item.status === 'Verified' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                  item.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'Verified' ? 'bg-emerald-500' :
                    item.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="text-xs font-black uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
              <div className="max-w-xs text-right md:text-left">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Terms & Conditions</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  This is a computer-generated invoice and does not require a physical signature. Fees paid are non-refundable after the first two weeks of the semester.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Print only watermark/branding */}
        <div className="hidden print:block text-center mt-12">
          <p className="text-slate-300 text-[10px] uppercase font-black tracking-[10px]">Generated by ESMS Financial Portal</p>
        </div>
      </div>
    </div>
  );
}
