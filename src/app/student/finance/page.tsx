"use client";

import { Zap, Wallet, Filter, Info } from "lucide-react";
import { toast } from "sonner";

const statusBadge = (status: string) => {
  if (status === "confirmed") return "bg-finance-success/10 text-finance-success";
  if (status === "pending") return "bg-exam-warning/10 text-exam-warning";
  return "bg-error/10 text-error";
};

export default function StudentFinance() {
  // Mock Data

  
  const finance = {
    academic_year: "2024/2025",
    semester: 1,
    balance_ugx: 1250000,
    amount_ugx: 2500000,
    due_date: "2024-05-15T00:00:00Z"
  };

  const transactions = [
    { id: 1, transaction_date: "2024-02-10T00:00:00Z", reference: "MTN-8X9Y2", description: "Mobile Money Payment", amount_ugx: 1250000, status: "confirmed" },
    { id: 2, transaction_date: "2024-01-20T00:00:00Z", reference: "BANK-INV1", description: "Initial Deposit", amount_ugx: 500000, status: "confirmed" }
  ];

  const balance = finance?.balance_ugx ?? 0;
  const isArrears = balance > 0;

  return (
    <main className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-on-surface">Finance Ledger</h1>
        <p className="text-sm text-on-surface-variant mt-1">Academic Year {finance?.academic_year ?? "2024/2025"} · Semester {finance?.semester ?? 1}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Summary */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 relative z-10">Overall Balance</p>
            <h2 className={`text-4xl font-black mb-2 relative z-10 ${isArrears ? "text-error" : "text-finance-success"}`}>
              UGX {balance.toLocaleString()}
            </h2>
            <div className={`inline-flex items-center px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider mb-4 relative z-10 ${isArrears ? "bg-error/10 text-error" : "bg-finance-success/10 text-finance-success"}`}>
              {isArrears ? "ARREARS" : "CLEARED"}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle relative z-10">
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase">Term Fees</p>
                <p className="text-xl font-black text-on-surface">UGX {(finance?.amount_ugx ?? 0).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface-variant uppercase">Due Date</p>
                <p className="text-sm font-semibold text-on-surface">
                  {finance?.due_date
                    ? new Date(finance.due_date).toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" })
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toast.success('Redirecting to payment gateway...')} className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:opacity-90">
              <Zap size={18} />
              Quick-pay
            </button>
            <button onClick={() => toast.info('Opening wallet manager...')} className="flex items-center justify-center gap-2 bg-white border border-border-subtle text-on-surface py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:bg-slate-50">
              <Wallet size={18} />
              Manage
            </button>
          </div>
        </div>

        {/* Right: Transactions */}
        <div className="xl:col-span-8 space-y-4">
          <section className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface-container-low/30">
              <h3 className="text-lg font-bold text-on-surface">Payment History</h3>
              <Filter className="text-outline" size={20} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-bg/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Amount (UGX)</th>
                    <th className="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {transactions && transactions.length > 0 ? (
                    transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-on-surface">
                            {new Date(tx.transaction_date).toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                          {tx.reference && <p className="text-xs text-slate-400">{tx.reference}</p>}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{tx.description}</td>
                        <td className="px-6 py-4 text-right font-bold text-on-surface">{tx.amount_ugx.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${statusBadge(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                        No transactions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {transactions && transactions.length > 0 && (
              <button onClick={() => toast.info('Loading full transaction history...')} className="w-full py-3 text-primary font-semibold text-sm bg-primary/5 hover:bg-primary/10 transition-colors">
                View All Transactions
              </button>
            )}
          </section>

          {/* Help Banner */}
          <div className="p-4 bg-secondary-container/30 rounded-xl flex gap-3 items-start border border-secondary-container">
            <Info className="text-on-secondary-container mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-semibold text-on-secondary-container text-sm">Need help with your balance?</p>
              <p className="text-xs text-on-secondary-container opacity-80 leading-relaxed mt-1">
                Financial aid and scholarship deductions are updated every 24 hours. Contact the Bursar&apos;s office at{" "}
                <a href="mailto:bursar@cavendish.ac.ug" className="underline">bursar@cavendish.ac.ug</a> for immediate queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
