"use client";

import { Download, Plus, Filter, ArrowUpDown, ChevronRight, Calendar, BookOpen, UserSearch, UserCheck, Clock, FileWarning } from "lucide-react";
import { toast } from "sonner";

import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistryEnrollmentHub() {
  const { students } = useGlobalContext();

  return (
    <div className="p-lg max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Main Portal</span>
            <ChevronRight size={12} />
            <span>Registry</span>
            <ChevronRight size={12} />
            <span className="text-blue-600 font-medium">Enrollment Hub</span>
          </nav>
          <h1 className="font-h1 text-h1 text-slate-900">Enrollment Hub</h1>
          <p className="text-slate-500 mt-1">Manage course registrations and academic enrollment for Cavendish University Uganda.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Exporting registry report...')} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-button text-button flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export Report
          </button>
          <button onClick={() => toast.info('Opening new registration form...')} className="bg-primary text-white px-4 py-2 rounded-lg font-button text-button flex items-center gap-2 shadow-sm hover:opacity-90 transition-all">
            <Plus size={18} />
            New Registration
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* Main Table Section */}
        <div className="xl:col-span-9 space-y-gutter">
          {/* Stats Quick-View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="bg-white p-lg rounded-xl border border-border-subtle flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <UserSearch size={28} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
                <p className="text-2xl font-bold text-slate-900">4,892</p>
              </div>
            </div>
            <div className="bg-white p-lg rounded-xl border border-border-subtle flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Waitlisted</p>
                <p className="text-2xl font-bold text-slate-900">124</p>
              </div>
            </div>
            <div className="bg-white p-lg rounded-xl border border-border-subtle flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <UserCheck size={28} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Completion</p>
                <p className="text-2xl font-bold text-slate-900">92%</p>
              </div>
            </div>
          </div>

          {/* Course Registration Management */}
          <div className="bg-white rounded-xl border border-border-subtle overflow-hidden">
            <div className="p-lg border-b border-border-subtle flex items-center justify-between">
              <h3 className="font-h3 text-h3 text-slate-900">Student Registration Status</h3>
              <div className="flex gap-2">
                <button onClick={() => toast.info('Filters applied')} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Filter size={20} />
                </button>
                <button onClick={() => toast.info('Sorting table...')} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <ArrowUpDown size={20} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 font-table-header text-table-header text-slate-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 font-table-header text-table-header text-slate-500 uppercase tracking-wider">Student ID</th>
                    <th className="px-6 py-4 font-table-header text-table-header text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-table-header text-table-header text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{s.name.toUpperCase()}</td>

                      <td className="px-6 py-4 text-slate-600">{s.id.split('-').slice(1).join('-')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          s.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-700' :
                          s.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {s.status === 'Enrolled' ? 'Fully Registered' : (s.status === 'Pending' ? 'Pending Approval' : 'Provisionally Enrolled')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => alert('Feature in development...')}  className="text-blue-600 hover:underline text-sm font-medium">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">Showing 5 of 10 students from Group A</span>
              <div className="flex gap-2">
                <button onClick={() => toast.error('Already on first page')} className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-sm">Previous</button>
                <button onClick={() => toast.info('Loading next page...')} className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel (Action Tools & Deadlines) */}
        <aside className="xl:col-span-3 space-y-gutter">
          {/* Action Tools */}
          <div className="bg-white rounded-xl border border-border-subtle overflow-hidden">
            <div className="p-lg border-b border-border-subtle">
              <h3 className="font-h3 text-h3 text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-md space-y-3">
              <button onClick={() => toast.success('Initializing bulk enrollment...')} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-600 group-hover:text-white" size={20} />
                  <span className="font-medium">Bulk Enroll</span>
                </div>
                <ChevronRight className="text-slate-400 group-hover:text-white" size={20} />
              </button>
              <button onClick={() => toast.error('No conflicts to resolve at this time')} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <FileWarning className="text-blue-600 group-hover:text-white" size={20} />
                  <span className="font-medium">Resolve Conflicts</span>
                </div>
                <ChevronRight className="text-slate-400 group-hover:text-white" size={20} />
              </button>
              <button onClick={() => toast.success('Auto-assigning schedules...')} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-600 group-hover:text-white" size={20} />
                  <span className="font-medium">Auto-Assign Sched</span>
                </div>
                <ChevronRight className="text-slate-400 group-hover:text-white" size={20} />
              </button>
            </div>
          </div>

          {/* Important Registration Deadlines */}
          <div className="bg-white rounded-xl border border-border-subtle overflow-hidden">
            <div className="p-lg border-b border-border-subtle">
              <h3 className="font-h3 text-h3 text-slate-900">Important Deadlines</h3>
            </div>
            <div className="p-md space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-600 min-w-[50px] h-[50px] rounded-lg border border-blue-100">
                  <span className="text-xs font-bold uppercase leading-none">OCT</span>
                  <span className="text-xl font-bold leading-none mt-1">15</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 leading-tight">Regular Registration Ends</p>
                  <p className="text-xs text-slate-500 mt-1">Close of business (17:00 EAT)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-amber-50 text-amber-600 min-w-[50px] h-[50px] rounded-lg border border-amber-100">
                  <span className="text-xs font-bold uppercase leading-none">OCT</span>
                  <span className="text-xl font-bold leading-none mt-1">22</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 leading-tight">Late Enrollment Closes</p>
                  <p className="text-xs text-slate-500 mt-1">Penalty fees apply from Oct 16</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-slate-50 text-slate-600 min-w-[50px] h-[50px] rounded-lg border border-slate-200">
                  <span className="text-xs font-bold uppercase leading-none">NOV</span>
                  <span className="text-xl font-bold leading-none mt-1">01</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 leading-tight">Census Date</p>
                  <p className="text-xs text-slate-500 mt-1">Final reporting for statistics</p>
                </div>
              </div>
              <button onClick={() => toast.info('Loading calendar...')} className="w-full mt-2 py-2 text-blue-600 font-button text-button hover:underline text-center">
                View Academic Calendar
              </button>
            </div>
          </div>

          {/* Quick Help/Guide */}
          <div className="bg-slate-900 rounded-xl p-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-semibold text-lg">Registry Guide</h4>
              <p className="text-slate-400 text-sm mt-2">Need help with student overrides or waitlist prioritization?</p>
              <button onClick={() => toast.info('Opening documentation...')} className="mt-4 bg-white text-slate-900 px-4 py-2 rounded font-button text-button hover:bg-blue-50 transition-colors">
                Access Documentation
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <BookOpen size={100} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
