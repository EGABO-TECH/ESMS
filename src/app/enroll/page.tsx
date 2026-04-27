"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EnrollmentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    staffId: "",
    officeDesignation: "",
    terminalId: "",
    faculty: "",
    studentId: "",
    programOfStudy: "",
    year: "1",
    semester: "1",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock enrollment logic
    setTimeout(() => {
      setLoading(false);
      alert("Account creation requested. Administrator will verify your credentials.");
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#001a40] p-8 text-center">
          <div className="bg-white w-20 h-20 mx-auto rounded-lg p-2 mb-4 flex items-center justify-center">
            <Image 
              src="/cuu-logo.png" 
              alt="Cavendish University Logo" 
              width={64} 
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">Cavendish University Uganda</h1>
          <p className="text-blue-100/80 text-sm mt-1 font-medium">Portal Enrollment</p>
          <p className="text-blue-100/50 text-[10px] mt-4 uppercase tracking-[2px]">Capture your identity markers to begin</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleEnroll} className="p-8 space-y-8">
          {/* Primary Identity */}
          <section className="space-y-4">
            <h2 className="text-[#001a40] text-lg font-bold border-b pb-2">Primary Identity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                />
              </div>
              <div>
                <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">University Email (@students.cavendish.ac.ug)</label>
              <input
                type="email"
                name="email"
                placeholder="AA250100@students.cavendish.ac.ug"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Portal Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all bg-white"
              >
                <option value="">Select Role...</option>
                <option value="Administrator">Administrator</option>
                <option value="Registrar">Registrar</option>
                <option value="Finance Officer">Finance Officer</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </section>

          {/* Identity Markers (Dynamic) */}
          <section className="space-y-4">
            <h2 className="text-[#001a40] text-lg font-bold border-b pb-2">Identity Markers</h2>
            {!formData.role ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-xl p-8 text-center italic text-slate-400 text-sm">
                Please select a role to populate specific fields.
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                {formData.role === "Registrar" && (
                  <>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Staff ID Number</label>
                      <input
                        type="text"
                        name="staffId"
                        placeholder="REG-XXX"
                        value={formData.staffId}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Office Designation</label>
                      <select
                        name="officeDesignation"
                        value={formData.officeDesignation}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all bg-white"
                      >
                        <option value="">Select Office...</option>
                        <option value="Admissions Office">Admissions Office</option>
                        <option value="Exams Office">Exams Office</option>
                        <option value="Registry Support">Registry Support</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.role === "Finance Officer" && (
                  <>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Staff ID Number</label>
                      <input
                        type="text"
                        name="staffId"
                        placeholder="FIN-XXX"
                        value={formData.staffId}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Terminal ID / Clearance Code</label>
                      <input
                        type="text"
                        name="terminalId"
                        placeholder="e.g. TRM-001"
                        value={formData.terminalId}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                      />
                    </div>
                  </>
                )}

                {formData.role === "Lecturer" && (
                  <>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Staff ID Number</label>
                      <input
                        type="text"
                        name="staffId"
                        placeholder="EMP-XXX"
                        value={formData.staffId}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Faculty / Department</label>
                      <select
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all bg-white"
                      >
                        <option value="">Select Faculty...</option>
                        <option value="Science & Technology">Science & Technology</option>
                        <option value="Business & Management">Business & Management</option>
                        <option value="Socio-Economic Sciences">Socio-Economic Sciences</option>
                        <option value="Laws">Laws</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.role === "Student" && (
                  <>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Registration Number</label>
                      <input
                        type="text"
                        name="studentId"
                        placeholder="XXX-XXX"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Program of Study</label>
                      <select
                        name="programOfStudy"
                        value={formData.programOfStudy}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all bg-white"
                      >
                        <option value="">Select Program...</option>
                        <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                        <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                        <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                        <option value="Bachelor Of Science in Software Engineering">Bachelor Of Science in Software Engineering</option>
                        <option value="Bachelor of Science in Data Science and Artificial Intelligence">Bachelor of Science in Data Science and Artificial Intelligence</option>
                        <option value="Bachelor of Science in Public Health">Bachelor of Science in Public Health</option>
                        <option value="Bachelor of Arts in International Relations and Diplomacy">Bachelor of Arts in International Relations and Diplomacy</option>
                        <option value="Bachelor of Laws (LLB)">Bachelor of Laws (LLB)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Year</label>
                        <input
                          type="number"
                          name="year"
                          min="1"
                          max="4"
                          value={formData.year}
                          onChange={handleChange}
                          required
                          className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Semester</label>
                        <input
                          type="number"
                          name="semester"
                          min="1"
                          max="2"
                          value={formData.semester}
                          onChange={handleChange}
                          required
                          className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.role === "Administrator" && (
                  <div>
                    <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Staff ID Number</label>
                    <input
                      type="text"
                      name="staffId"
                      placeholder="ADM-XXX"
                      value={formData.staffId}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
                    />
                  </div>
                )}

                {formData.role !== "Student" && (
                  <p className="text-[10px] text-slate-400 mt-2 italic">
                    {formData.role} accounts require manual verification by the IT center.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Security & Access */}
          <section className="space-y-4">
            <h2 className="text-[#001a40] text-lg font-bold border-b pb-2">Security & Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Confirm</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="space-y-4">
            <h2 className="text-[#001a40] text-lg font-bold border-b pb-2">Verification</h2>
            <div>
              <label className="text-slate-700 text-xs font-bold uppercase mb-2 block">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                placeholder="+256 ..."
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#001a40] transition-all"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
            <Link 
              href="/" 
              className="text-slate-500 text-sm font-bold flex items-center gap-2 hover:text-[#001a40] transition-colors order-2 md:order-1"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-[#001a40] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#002a60] transition-all shadow-lg order-1 md:order-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                "Create Professional Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
