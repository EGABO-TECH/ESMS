"use client";

import { useState, useMemo, useEffect } from "react";
import { FileText, Search, Filter, CheckCircle, Clock, AlertCircle, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function RegistrarTranscriptsPage() {
  const { transcriptRequests, addTranscriptRequest, updateTranscriptRequestStatus, deleteTranscriptRequest } = useGlobalContext();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReqName, setNewReqName] = useState("");
  const [newReqType, setNewReqType] = useState("Official");

  const filteredRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return transcriptRequests.filter(req => {
      const matchesSearch = !query || req.name.toLowerCase().includes(query) || req.id.toLowerCase().includes(query);
      const matchesFilter = filterStatus === "All" || req.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [transcriptRequests, searchTerm, filterStatus]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqName.trim()) {
      toast.error("Student name is required");
      return;
    }
    const newId = `TR-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toISOString().slice(0, 10);
    
    addTranscriptRequest({
      id: newId,
      name: newReqName.trim(),
      type: newReqType,
      status: "In Progress",
      date
    });
    
    toast.success(`Request ${newId} created successfully`);
    setIsModalOpen(false);
    setNewReqName("");
    setNewReqType("Official");
  };

  const pendingCount = transcriptRequests.filter(r => r.status === "In Progress" || r.status === "Pending Payment").length;
  const verifiedCount = transcriptRequests.filter(r => r.status === "Ready" || r.status === "Verified").length;
  const unpaidCount = transcriptRequests.filter(r => r.status === "Pending Payment").length;

  if (!isMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Transcript Services</h1>
          <p className="text-slate-500 mt-1">Processing and issuance of official and unofficial academic transcripts.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00174b] text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95">
          <FileText size={18} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pending Requests", val: pendingCount.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Ready / Verified", val: verifiedCount.toString(), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Unpaid Requests", val: unpaidCount.toString(), icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.val}</p>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden pb-16">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-slate-900">Active Request Queue</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-600 transition-all w-48" 
                placeholder="Search ID or Name..." 
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none">
                <Filter size={14} />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="In Progress">In Progress</option>
                <option value="Verified">Verified</option>
                <option value="Ready">Ready</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No transcript requests found.
                  </td>
                </tr>
              ) : filteredRequests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">{r.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{r.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Requested: {r.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{r.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={r.status}
                      onChange={(e) => {
                        updateTranscriptRequestStatus(r.id, e.target.value);
                        toast.success(`Updated ${r.id} to ${e.target.value}`);
                      }}
                      className={`text-[10px] font-black uppercase rounded-full px-2 py-1 outline-none border border-transparent hover:border-slate-300 focus:border-blue-500 transition-colors cursor-pointer appearance-none ${
                        r.status === 'Ready' || r.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 
                        r.status === 'Pending Payment' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <option value="Pending Payment" className="bg-white text-slate-900">Pending Payment</option>
                      <option value="In Progress" className="bg-white text-slate-900">In Progress</option>
                      <option value="Verified" className="bg-white text-slate-900">Verified</option>
                      <option value="Ready" className="bg-white text-slate-900">Ready</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        if(confirm(`Delete transcript request ${r.id}?`)) {
                          deleteTranscriptRequest(r.id);
                          toast.success("Request deleted successfully");
                        }
                      }}
                      className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg transition-colors" 
                      title="Delete Request"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-black text-slate-900">New Transcript Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">Student Name</label>
                <input 
                  type="text" 
                  value={newReqName}
                  onChange={e => setNewReqName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">Transcript Type</label>
                <select 
                  value={newReqType}
                  onChange={e => setNewReqType(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                >
                  <option value="Official">Official</option>
                  <option value="Unofficial">Unofficial</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-[#00174b] text-white font-bold text-sm hover:opacity-90 shadow-md transition-all active:scale-95">
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
