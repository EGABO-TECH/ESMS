"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  X,
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  GraduationCap,
  Banknote,
  ClipboardList,
} from "lucide-react";
import { createUser, UserRole } from "@/app/actions/createUser";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ROLES: { value: UserRole; label: string; description: string; color: string; icon: React.ElementType }[] = [
  {
    value: "admin",
    label: "Administrator",
    description: "Full system access & user management",
    color: "indigo",
    icon: ShieldCheck,
  },
  {
    value: "lecturer",
    label: "Lecturer",
    description: "Course management & grade entry",
    color: "amber",
    icon: GraduationCap,
  },
  {
    value: "finance_officer",
    label: "Finance Officer",
    description: "Fee collection & financial reports",
    color: "emerald",
    icon: Banknote,
  },
  {
    value: "registrar",
    label: "Registrar",
    description: "Student records & academic registry",
    color: "blue",
    icon: ClipboardList,
  },
  {
    value: "student",
    label: "Student",
    description: "Portal access for enrolled students",
    color: "slate",
    icon: User,
  },
];

const ROLE_COLOR_MAP: Record<string, { ring: string; bg: string; text: string; badge: string }> = {
  indigo: {
    ring: "ring-indigo-500 border-indigo-500",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    badge: "bg-indigo-600 text-white",
  },
  amber: {
    ring: "ring-amber-500 border-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    badge: "bg-amber-600 text-white",
  },
  emerald: {
    ring: "ring-emerald-500 border-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-600 text-white",
  },
  blue: {
    ring: "ring-blue-500 border-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-600 text-white",
  },
  slate: {
    ring: "ring-slate-500 border-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-700",
    badge: "bg-slate-600 text-white",
  },
};

const DEPARTMENTS = [
  "IT Center",
  "Academic Registry",
  "Finance & Treasury",
  "Faculty of Science & Technology",
  "Faculty of Business",
  "Faculty of Law",
  "Faculty of Health Sciences",
  "Faculty of Arts & Social Sciences",
  "Student Affairs",
  "Human Resources",
  "Admissions Office",
  "Library Services",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "lecturer" as UserRole,
  department: "",
  phone: "",
};

export default function CreateUserModal({ isOpen, onClose, onSuccess }: CreateUserModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<typeof INITIAL_FORM>>({});
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(INITIAL_FORM);
        setFieldErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
      }, 300);
    }
  }, [isOpen]);

  function update(key: keyof typeof INITIAL_FORM, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const errors: Partial<typeof INITIAL_FORM> = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "A valid email address is required";
    if (form.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: form.role,
        department: form.department,
        phone: form.phone,
      });

      if (result.success) {
        const roleDef = ROLES.find((r) => r.value === form.role);
        toast.success(`Account created for ${form.firstName} ${form.lastName} as ${roleDef?.label ?? form.role}`);
        onSuccess?.();
        onClose();
      } else {
        toast.error(result.error ?? "Failed to create account");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedRole = ROLES.find((r) => r.value === form.role)!;
  const colors = ROLE_COLOR_MAP[selectedRole.color];

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(2, 6, 23, 0.72)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{ maxHeight: "95vh" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#00174b] to-[#00308f] px-8 py-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <UserPlus className="text-white" size={22} />
            </div>
            <div>
              <h2 className="text-white font-black text-xl leading-tight">Create User Account</h2>
              <p className="text-blue-200 text-xs mt-0.5">Provision a new system account with role-based access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl p-2 transition-all"
            id="create-user-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto" style={{ maxHeight: "calc(95vh - 100px)" }}>
          <div className="p-8 space-y-8">

            {/* Role Selection */}
            <section>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Account Role *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROLES.map((role) => {
                  const isSelected = form.role === role.value;
                  const rc = ROLE_COLOR_MAP[role.color];
                  const RIcon = role.icon;
                  return (
                    <button
                      type="button"
                      key={role.value}
                      id={`role-option-${role.value}`}
                      onClick={() => update("role", role.value)}
                      className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all duration-150
                        ${isSelected
                          ? `${rc.ring} ${rc.bg} ring-2 ring-offset-1`
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      <div className={`p-2 rounded-xl ${isSelected ? rc.bg : "bg-slate-100"}`}>
                        <RIcon size={16} className={isSelected ? rc.text : "text-slate-500"} />
                      </div>
                      <div>
                        <p className={`text-xs font-black ${isSelected ? rc.text : "text-slate-700"}`}>
                          {role.label}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{role.description}</p>
                      </div>
                      {isSelected && (
                        <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${rc.badge}`}>
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Name Fields */}
            <section>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Personal Information *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="create-user-first-name"
                  label="First Name"
                  icon={<User size={15} className="text-slate-400" />}
                  value={form.firstName}
                  onChange={(v) => update("firstName", v)}
                  placeholder="e.g. Brenda"
                  error={fieldErrors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  id="create-user-last-name"
                  label="Last Name"
                  icon={<User size={15} className="text-slate-400" />}
                  value={form.lastName}
                  onChange={(v) => update("lastName", v)}
                  placeholder="e.g. Ababiku"
                  error={fieldErrors.lastName}
                  autoComplete="family-name"
                />
              </div>
            </section>

            {/* Contact */}
            <section>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="create-user-email"
                  label="Email Address *"
                  icon={<Mail size={15} className="text-slate-400" />}
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="name@cuu.ac.ug"
                  error={fieldErrors.email}
                  type="email"
                  autoComplete="email"
                />
                <Field
                  id="create-user-phone"
                  label="Phone (optional)"
                  icon={<Phone size={15} className="text-slate-400" />}
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="+256 700 000 000"
                  type="tel"
                />
              </div>
            </section>

            {/* Department */}
            <section>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Department / Faculty
              </label>
              <div className="relative">
                <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="create-user-department"
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none"
                >
                  <option value="">— Select department (optional) —</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </section>

            {/* Password */}
            <section>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Set Password *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordField
                  id="create-user-password"
                  label="Password"
                  icon={<Lock size={15} className="text-slate-400" />}
                  value={form.password}
                  onChange={(v) => update("password", v)}
                  placeholder="Min. 8 characters"
                  error={fieldErrors.password}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="new-password"
                />
                <PasswordField
                  id="create-user-confirm-password"
                  label="Confirm Password"
                  icon={<Lock size={15} className="text-slate-400" />}
                  value={form.confirmPassword}
                  onChange={(v) => update("confirmPassword", v)}
                  placeholder="Repeat password"
                  error={fieldErrors.confirmPassword}
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((s) => !s)}
                  autoComplete="new-password"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                <ShieldCheck size={11} /> The user will be asked to change their password on first login.
              </p>
            </section>

            {/* Role Summary Banner */}
            <div className={`rounded-2xl border ${colors.ring} ${colors.bg} px-5 py-4 flex items-center gap-4`}>
              <div className={`p-2.5 rounded-xl bg-white/70`}>
                <selectedRole.icon size={20} className={colors.text} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-black ${colors.text}`}>{selectedRole.label} Account</p>
                <p className="text-xs text-slate-500 mt-0.5">{selectedRole.description}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${colors.badge}`}>
                {form.role}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-slate-100 px-8 py-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              id="create-user-cancel"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="create-user-submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-xl text-white text-sm font-black flex items-center gap-2.5 transition-all shadow-lg
                ${isSubmitting
                  ? "bg-slate-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-[#00174b] to-[#00308f] hover:opacity-90 shadow-blue-200"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account…
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create {selectedRole.label} Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function Field({
  id, label, icon, value, onChange, placeholder, error, type = "text", autoComplete,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl outline-none transition-all
            ${error
              ? "border-red-400 focus:ring-2 focus:ring-red-300 bg-red-50"
              : "border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}

function PasswordField({
  id, label, icon, value, onChange, placeholder, error, show, onToggle, autoComplete,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  show: boolean;
  onToggle: () => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border rounded-xl outline-none transition-all
            ${error
              ? "border-red-400 focus:ring-2 focus:ring-red-300 bg-red-50"
              : "border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}
