"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  ChevronRight,
  ShieldAlert,
  UserCheck,
  Power,
} from "lucide-react";
import CreateUserModal from "@/components/CreateUserModal";

import { useGlobalContext } from "@/lib/GlobalContext";

const roleColors: Record<string, string> = {
  "Super Admin":     "bg-indigo-600 text-white",
  "Registrar":       "bg-blue-600 text-white",
  "Finance Officer": "bg-emerald-600 text-white",
  "Lecturer":        "bg-amber-600 text-white",
  "Admissions":      "bg-slate-600 text-white",
  "Admin":           "bg-indigo-600 text-white",
  "Student":         "bg-violet-600 text-white",
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { users } = useGlobalContext();

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* ─── Create User Modal ─────────────────────────────────── */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          // In a real app you would refresh user list from the server here
        }}
      />

      <div className="p-6 space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <span>Administration</span>
              <ChevronRight size={10} />
              <span className="text-primary">User Management</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900">System Staff &amp; Access</h1>
            <p className="text-slate-500 mt-1">Control administrative access and institutional user accounts.</p>
          </div>
          <div className="flex gap-3">
            <button
              id="open-create-user-modal"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-[#00174b] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
            >
              <UserPlus size={18} />
              Create Account
            </button>
          </div>
        </div>

        {/* RBAC Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Active Admins",         val: "12",  icon: ShieldCheck, color: "text-indigo-600",  bg: "bg-indigo-50"  },
            { label: "Faculty Staff",          val: "142", icon: Users,       color: "text-blue-600",    bg: "bg-blue-50"    },
            { label: "Accounts Locked",        val: "2",   icon: Lock,        color: "text-red-600",     bg: "bg-red-50"     },
            { label: "Verification Pending",   val: "5",   icon: UserCheck,   color: "text-amber-600",   bg: "bg-amber-50"   },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              id="users-search"
              type="text"
              placeholder="Search staff by name, email or role..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => toast.info("Role filter coming soon")}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Filter size={18} /> Filter Roles
          </button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* "Add New" card */}
          <button
            id="create-user-card-btn"
            onClick={() => setIsCreateModalOpen(true)}
            className="group bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer min-h-[240px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <UserPlus size={24} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-black text-slate-600 group-hover:text-blue-700 transition-colors">Create New Account</p>
              <p className="text-xs text-slate-400 mt-1">Provision a lecturer, admin, finance officer, registrar, or student</p>
            </div>
          </button>

          {filtered.map((user, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className={`h-2 ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black text-xl border border-slate-100">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase shadow-sm ${roleColors[user.role] ?? "bg-slate-600 text-white"}`}>
                      {user.role}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                      Last seen {user.lastLogin}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-1">{user.name}</h3>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary/60" /> {user.department}
                </p>

                <div className="mt-6 space-y-3 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Mail size={14} className="text-primary/40" /> {user.email}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Phone size={14} className="text-primary/40" /> +256 414 000 000
                  </div>
                </div>

                <div className="mt-8 flex gap-2">
                  <button
                    onClick={() => toast.info("Managing permissions...")}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-primary/5 text-slate-600 hover:text-primary font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Lock size={14} /> Permissions
                  </button>
                  <button
                    onClick={() => toast.success("Password reset email sent")}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"
                    title="Reset Password"
                  >
                    <ShieldAlert size={16} />
                  </button>
                  <button
                    onClick={() => toast.error("Confirm account deactivation...")}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                    title="Deactivate"
                  >
                    <Power size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
