import { TrendingUp, Users, GraduationCap, BookOpen, DollarSign, AlertTriangle, MessageSquare, CheckCircle } from "lucide-react";

export default async function AdminDashboard() {
  // Mock Data
  const totalStudents = 4892;
  const totalStaff = 342;
  const activeCourses = 156;
  
  const totalInvoiced = 4500000000;
  const totalCollected = 3800000000;
  const collectionRate = Math.round((totalCollected / totalInvoiced) * 100);

  const recentAdmissions = [
    { id: 1, applicant_name: "Ababiku Brenda", nationality: "Ugandan", programme: "AES Content", applied_at: "2023-10-24T10:00:00Z", status: "pending" },
    { id: 2, applicant_name: "Alimpa Anne Hillary", nationality: "Kenyan", programme: "Conservation", applied_at: "2023-10-23T14:30:00Z", status: "enrolled" },
    { id: 3, applicant_name: "Egabo Aaron", nationality: "Ugandan", programme: "AES Content", applied_at: "2023-10-23T09:15:00Z", status: "interview" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-exam-warning/10 text-exam-warning",
    interview: "bg-primary/10 text-primary",
    offer: "bg-sis-accent/10 text-sis-accent",
    enrolled: "bg-finance-success/10 text-finance-success",
    rejected: "bg-error/10 text-error",
  };

  return (
    <div className="p-6 space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Enrolled</p>
              <p className="text-4xl font-black text-on-surface">{(totalStudents ?? 0).toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg"><Users className="text-primary" size={24} /></div>
          </div>
          <div className="flex items-center gap-1 text-finance-success text-sm font-semibold">
            <TrendingUp size={16} />
            <span>Active students</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Lecturers</p>
              <p className="text-4xl font-black text-on-surface">{totalStaff ?? 0}</p>
            </div>
            <div className="bg-sis-accent/10 p-2 rounded-lg"><GraduationCap className="text-sis-accent" size={24} /></div>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-sm font-semibold">
            <CheckCircle size={16} />
            <span>Stable</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Active Courses</p>
              <p className="text-4xl font-black text-on-surface">{activeCourses ?? 0}</p>
            </div>
            <div className="bg-finance-success/10 p-2 rounded-lg"><BookOpen className="text-finance-success" size={24} /></div>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-sm font-semibold">
            <TrendingUp size={16} />
            <span>Running this semester</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Fee Collection Rate</p>
              <p className="text-4xl font-black text-on-surface">{collectionRate}%</p>
            </div>
            <div className="bg-exam-warning/10 p-2 rounded-lg"><DollarSign className="text-exam-warning" size={24} /></div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 mt-1">
            <div className="bg-finance-success h-full rounded-full" style={{ width: `${collectionRate}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">Target: 95% by Semester End</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Finance Overview */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border-subtle shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Fee Collection Status</h2>
          <p className="text-sm text-slate-400 mb-6">UGX Invoiced vs Collected</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold text-slate-600">Total Invoiced</span>
                <span className="text-sm font-bold">UGX {(totalInvoiced / 1_000_000).toFixed(1)}M</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-slate-300 h-full rounded-full w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold text-slate-600">Total Collected</span>
                <span className="text-sm font-bold text-finance-success">UGX {(totalCollected / 1_000_000).toFixed(1)}M</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-finance-success h-full rounded-full transition-all duration-700" style={{ width: `${collectionRate}%` }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-subtle">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Invoiced</p>
              <p className="text-xl font-black text-slate-700">UGX {(totalInvoiced / 1_000_000_000).toFixed(1)}B</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Collected</p>
              <p className="text-xl font-black text-finance-success">UGX {(totalCollected / 1_000_000_000).toFixed(1)}B</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Outstanding</p>
              <p className="text-xl font-black text-error">UGX {((totalInvoiced - totalCollected) / 1_000_000_000).toFixed(1)}B</p>
            </div>
          </div>
        </div>

        {/* Action Required */}
        <div className="bg-white rounded-xl border border-border-subtle shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Action Required</h2>
          <div className="space-y-3">
            <div className="p-4 bg-error/5 border border-error/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-error" size={16} />
                <p className="font-bold text-slate-800 text-sm">MM Reconciliation Alert</p>
              </div>
              <p className="text-xs text-slate-500">Discrepancy found in MTN batch. Review needed.</p>
              <button className="text-error text-xs font-bold mt-2 hover:underline">RE-EXAMINE TRANSACTION →</button>
            </div>
            <div className="p-4 bg-exam-warning/5 border border-exam-warning/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="text-exam-warning" size={16} />
                <p className="font-bold text-slate-800 text-sm">Moderation Pending</p>
              </div>
              <p className="text-xs text-slate-500">Semester II results awaiting final approval.</p>
              <button className="text-exam-warning text-xs font-bold mt-2 hover:underline">GO TO MODERATION →</button>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="text-primary" size={16} />
                <p className="font-bold text-slate-800 text-sm">Communication Broadcast</p>
              </div>
              <p className="text-xs text-slate-500">Graduation 2024 announcement draft ready.</p>
              <button className="text-primary text-xs font-bold mt-2 hover:underline">VIEW DRAFT →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Admissions */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Admissions</h2>
          <a href="/admin/admissions" className="text-primary text-sm font-semibold hover:underline">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Programme</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {recentAdmissions && recentAdmissions.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recentAdmissions.map((adm: any) => (
                  <tr key={adm.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {adm.applicant_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{adm.applicant_name}</p>
                          <p className="text-xs text-slate-400">{adm.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{adm.programme}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(adm.applied_at).toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${statusColors[adm.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {adm.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No recent admissions.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
