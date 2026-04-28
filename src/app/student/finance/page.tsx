"use client";

import { useState } from "react";
import { Zap, Wallet, Info, Printer, Building2, Smartphone, CheckCircle, AlertCircle, X, CreditCard, Landmark, Copy } from "lucide-react";
import { toast } from "sonner";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HAS_BALANCE = true;

const rawTransactions = [
  { date: "01/02/2026", desc: "Tuition Fees — Semester 1",    debit: 1_800_000, credit: 0 },
  { date: "01/02/2026", desc: "Functional Fees",               debit: 450_000,  credit: 0 },
  { date: "10/02/2026", desc: "Bank Payment — Stanbic",        debit: 0,         credit: 1_000_000 },
  { date: "20/04/2026", desc: "Mobile Money Payment",          debit: 0,         credit: 500_000 },
];

// Build running balance ledger
let running = 0;
const ledger = rawTransactions.map(t => {
  running += t.debit - t.credit;
  return { ...t, balance: running };
});

const totalBilled  = rawTransactions.reduce((s, t) => s + t.debit,  0);
const totalPaid    = rawTransactions.reduce((s, t) => s + t.credit, 0);
const outstanding  = running; // final running balance



export default function StudentFinance() {
  const [balance, setBalance] = useState(outstanding);
  const [isCleared, setIsCleared] = useState(!HAS_BALANCE || outstanding <= 0);
  const [simulating, setSimulating] = useState(false);
  const [payAmount, setPayAmount] = useState(String(outstanding));
  const [showPayPanel, setShowPayPanel] = useState(false);
  const [showManage, setShowManage] = useState(false);

  const handleSimulatePayment = () => {
    const amount = Number(payAmount);
    if (!amount || amount <= 0) { toast.error("Enter a valid amount."); return; }
    if (amount > balance)       { toast.error("Payment exceeds outstanding balance."); return; }

    setSimulating(true);
    setTimeout(() => {
      const newBal = balance - amount;
      setBalance(newBal);
      setIsCleared(newBal <= 0);
      setSimulating(false);
      setShowPayPanel(false);
      toast.success(`UGX ${amount.toLocaleString()} processed via Mobile Money. ${newBal <= 0 ? "Account fully cleared! 🎉" : `Remaining: UGX ${newBal.toLocaleString()}`}`);
    }, 1500);
  };

  const finance = {
    academic_year: "2025/2026",
    semester: 1,
    amount_ugx: 2_250_000,
    due_date: "2026-05-27T00:00:00Z",
  };

  return (
    <main className="w-full pb-12">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-on-surface">Finance Ledger</h1>
        <p className="text-sm text-on-surface-variant mt-1">Academic Year {finance.academic_year} · Semester {finance.semester}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* ── Left: Summary ── */}
        <div className="xl:col-span-4 space-y-4">
          {/* Balance Card */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 relative z-10">Outstanding Balance</p>
            <h2 className={`text-4xl font-black mb-2 relative z-10 ${balance > 0 ? "text-error" : "text-finance-success"}`}>
              {balance > 0 ? `UGX ${balance.toLocaleString()}` : "CLEARED"}
            </h2>

            {/* Clearance Status Badge */}
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider mb-4 relative z-10 ${isCleared ? "bg-finance-success/10 text-finance-success" : "bg-error/10 text-error"}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isCleared ? "bg-finance-success" : "bg-error"}`} />
              {isCleared ? "FINANCIALLY CLEARED" : "PENDING CLEARANCE"}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle relative z-10">
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase">Total Fees</p>
                <p className="text-xl font-black text-on-surface">UGX {finance.amount_ugx.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface-variant uppercase">Due Date</p>
                <p className="text-sm font-semibold text-on-surface">
                  {new Date(finance.due_date).toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowPayPanel(v => !v)}
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:opacity-90"
            >
              <Zap size={18} /> Quick-pay
            </button>
            <button
              onClick={() => setShowManage(true)}
              className="flex items-center justify-center gap-2 bg-white border border-border-subtle text-on-surface py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:bg-slate-50"
            >
              <Wallet size={18} /> Manage
            </button>
          </div>

          {/* Exam Permit Info */}
          <div className="p-4 bg-exam-warning/5 rounded-xl flex gap-3 items-start border border-exam-warning/20">
            <AlertCircle className="text-exam-warning mt-0.5 shrink-0" size={18} />
            <div>
              <p className="font-semibold text-on-surface text-sm">Exam Permit Requirement</p>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                A <strong>Zero Balance</strong> is required to generate your Exam Permit and view final results.
              </p>
            </div>
          </div>

          {/* Bursar Help */}
          <div className="p-4 bg-secondary-container/30 rounded-xl flex gap-3 items-start border border-secondary-container">
            <Info className="text-on-secondary-container mt-0.5 shrink-0" size={18} />
            <div>
              <p className="font-semibold text-on-secondary-container text-sm">Need help with your balance?</p>
              <p className="text-xs text-on-secondary-container opacity-80 leading-relaxed mt-1">
                Contact the Bursar&apos;s office at{" "}
                <a href="mailto:bursar@cavendish.ac.ug" className="underline">bursar@cavendish.ac.ug</a> for immediate queries.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Ledger & Payment ── */}
        <div className="xl:col-span-8 space-y-6">

          {/* Simulate Payment Panel */}
          {showPayPanel && (
            <div className="bg-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-1">Simulate Mobile Money Payment</h4>
                <p className="text-blue-100 text-sm mb-6">Test the Financial Gate by paying your outstanding balance.</p>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">UGX</span>
                    <input
                      type="number"
                      value={payAmount}
                      onChange={e => setPayAmount(e.target.value)}
                      className="w-full bg-white text-on-surface font-bold pl-14 pr-4 py-3 rounded-xl outline-none text-sm"
                      placeholder="Amount"
                    />
                  </div>
                  <button
                    onClick={handleSimulatePayment}
                    disabled={simulating}
                    className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center gap-2"
                  >
                    {simulating
                      ? <><span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> Processing...</>
                      : <><Smartphone size={18} /> Pay Now</>
                    }
                  </button>
                  <button onClick={() => setShowPayPanel(false)} className="text-blue-200 hover:text-white text-sm font-medium px-2">Cancel</button>
                </div>
              </div>
              <Smartphone className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
            </div>
          )}

          {/* Financial Statement Header */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-low/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00174b] rounded-xl flex items-center justify-center text-white">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Financial Statement</h3>
                  <p className="text-xs text-on-surface-variant">Cavendish University Uganda · Main Campus, Ggaba Road</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 ${isCleared ? "bg-finance-success/10 text-finance-success" : "bg-error/10 text-error"}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isCleared ? "bg-finance-success" : "bg-error"}`} />
                {isCleared ? "FINANCIALLY CLEARED" : "PENDING CLEARANCE"}
              </div>
            </div>

            {/* Running Balance Ledger Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#00174b] text-white text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-right">Debit (Charges)</th>
                    <th className="px-6 py-4 text-right">Credit (Payments)</th>
                    <th className="px-6 py-4 text-right">Balance (UGX)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-sm">
                  {ledger.map((t, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-surface-container-low/20"} hover:bg-slate-50 transition-colors`}>
                      <td className="px-6 py-4 text-on-surface-variant font-medium whitespace-nowrap">{t.date}</td>
                      <td className="px-6 py-4 font-semibold text-on-surface">{t.desc}</td>
                      <td className="px-6 py-4 text-right text-error font-medium">
                        {t.debit > 0 ? t.debit.toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-right text-finance-success font-medium">
                        {t.credit > 0 ? t.credit.toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        {t.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Footer */}
            <div className="p-6 bg-surface-container-low/30 flex flex-col md:flex-row justify-end gap-8 border-t border-border-subtle">
              <div className="text-right">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Total Billed</p>
                <p className="text-xl font-black text-on-surface">UGX {totalBilled.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Total Paid</p>
                <p className="text-xl font-black text-finance-success">UGX {totalPaid.toLocaleString()}</p>
              </div>
              <div className="text-right bg-white px-6 py-3 rounded-xl shadow-sm border border-border-subtle">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Outstanding Balance</p>
                <p className={`text-2xl font-black ${balance > 0 ? "text-error" : "text-finance-success"}`}>
                  {balance > 0 ? `UGX ${balance.toLocaleString()}` : "CLEARED"}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                {isCleared
                  ? <><CheckCircle size={14} className="text-finance-success" /> Account is financially cleared</>
                  : <><AlertCircle size={14} className="text-error" /> Balance must be cleared before exam permits are issued</>
                }
              </div>
              <button
                onClick={() => { toast.success("Opening print preview..."); setTimeout(() => window.print(), 300); }}
                className="flex items-center gap-2 text-primary text-xs font-bold hover:underline"
              >
                <Printer size={14} /> Print Full Statement
              </button>
            </div>
          </div>

          {/* Mobile Money CTA (if balance) */}
          {balance > 0 && !showPayPanel && (
            <button
              onClick={() => setShowPayPanel(true)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-lg"
            >
              <Smartphone size={20} />
              Simulate Mobile Money Payment
            </button>
          )}
        </div>
      </div>

      {/* ── Wallet Management Modal ───────────────────────────── */}
      {showManage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowManage(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#00174b] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Payment Methods</h3>
                    <p className="text-blue-200 text-xs">Choose how to clear your balance</p>
                  </div>
                </div>
                <button onClick={() => setShowManage(false)} className="text-white/70 hover:text-white">
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Outstanding Balance Summary */}
              <div className={`p-4 rounded-2xl border text-center ${balance > 0 ? "bg-error/5 border-error/20" : "bg-finance-success/5 border-finance-success/20"}`}>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Outstanding Balance</p>
                <p className={`text-3xl font-black ${balance > 0 ? "text-error" : "text-finance-success"}`}>
                  {balance > 0 ? `UGX ${balance.toLocaleString()}` : "CLEARED ✓"}
                </p>
              </div>

              {/* Bank Transfer */}
              <div className="bg-surface-container-low rounded-2xl p-5 border border-border-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Landmark size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Bank Transfer</h4>
                    <p className="text-xs text-on-surface-variant">Stanbic Bank Uganda</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Account Name", value: "Cavendish University Uganda" },
                    { label: "Account Number", value: "9030012345678" },
                    { label: "Bank", value: "Stanbic Bank Uganda" },
                    { label: "Branch", value: "Ggaba Road Branch" },
                    { label: "Reference", value: "CUU-2024-258154" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-border-subtle">
                      <div>
                        <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">{row.label}</p>
                        <p className="text-xs font-bold text-on-surface font-mono">{row.value}</p>
                      </div>
                      <button
                        onClick={() => { navigator.clipboard.writeText(row.value); toast.success(`${row.label} copied!`); }}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="Copy"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Money */}
              <div className="bg-surface-container-low rounded-2xl p-5 border border-border-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Smartphone size={18} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Mobile Money (MTN / Airtel)</h4>
                    <p className="text-xs text-on-surface-variant">Instant payment — 24/7</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Merchant Code", value: "310055" },
                    { label: "Reference", value: "CUU-2024-258154" },
                    { label: "Amount (UGX)", value: balance.toLocaleString() },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-border-subtle">
                      <div>
                        <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">{row.label}</p>
                        <p className="text-xs font-bold text-on-surface font-mono">{row.value}</p>
                      </div>
                      <button
                        onClick={() => { navigator.clipboard.writeText(row.value); toast.success(`${row.label} copied!`); }}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="Copy"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-on-surface-variant mt-3 leading-relaxed">
                  Dial *165# (MTN) or *185# (Airtel) → Pay Bills → University Fees → Enter Merchant Code and your Student Number as reference.
                </p>
              </div>

              {/* Credit/Debit Card */}
              <div className="bg-surface-container-low rounded-2xl p-5 border border-border-subtle">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CreditCard size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Online Card Payment</h4>
                    <p className="text-xs text-on-surface-variant">Visa / Mastercard via secure gateway</p>
                  </div>
                </div>
                <button
                  onClick={() => { toast.info("Redirecting to secure payment gateway..."); }}
                  className="w-full py-3 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} />
                  Pay Online with Card — UGX {balance.toLocaleString()}
                </button>
              </div>

              <p className="text-center text-[10px] text-on-surface-variant">
                After payment, email your proof to <a href="mailto:bursar@cavendish.ac.ug" className="text-primary font-bold">bursar@cavendish.ac.ug</a> for same-day clearance confirmation.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
