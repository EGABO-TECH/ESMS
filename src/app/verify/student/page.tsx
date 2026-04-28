"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { buildVerificationPayload, signVerificationPayload } from "@/lib/qrSignature";

const readParam = (value: string | null, fallback: string) => {
  if (!value) return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

export default function StudentVerificationPage() {
  const searchParams = useSearchParams();

  const name = readParam(searchParams.get("name"), "Unknown Student");
  const studentId = readParam(searchParams.get("id"), "N/A");
  const course = readParam(searchParams.get("course"), "N/A");
  const campus = readParam(searchParams.get("campus"), "N/A");
  const validFrom = readParam(searchParams.get("validFrom"), "N/A");
  const validTo = readParam(searchParams.get("validTo"), "N/A");
  const avatar = readParam(
    searchParams.get("avatar"),
    "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  );
  const status = readParam(searchParams.get("status"), "active");
  const issuedAt = readParam(searchParams.get("issuedAt"), new Date().toISOString());
  const sig = readParam(searchParams.get("sig"), "");

  const expectedSig = useMemo(() => {
    const payload = buildVerificationPayload({
      name,
      id: studentId,
      course,
      campus,
      validFrom,
      validTo,
      avatar,
      status,
      issuedAt,
    });
    return signVerificationPayload(payload);
  }, [name, studentId, course, campus, validFrom, validTo, avatar, status, issuedAt]);

  const isSignatureValid = sig.length > 0 && sig === expectedSig;
  const isActive = status.toLowerCase() === "active";
  const verificationState = isSignatureValid ? (isActive ? "Verified Active Student" : "Verified Restricted Student") : "Unverified (QR Tampered)";
  const verificationTone = isSignatureValid ? (isActive ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-amber-700 bg-amber-50 border-amber-200") : "text-red-700 bg-red-50 border-red-200";
  const formattedIssuedAt = new Date(issuedAt).toLocaleString();
  const lastVerifiedAt = new Date().toLocaleString();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#00174b] px-5 py-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-white rounded-md p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cuu-logo.png" alt="Cavendish University Uganda Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Student Verification Card</p>
            <p className="text-sm text-white font-black">Cavendish University Uganda</p>
          </div>
        </div>

        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="inline-block p-1 bg-white rounded-full shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-full bg-gray-50 border-4 border-gray-100 object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#00174b] leading-tight">{name}</h1>
                <p className="text-xs font-bold text-primary uppercase mt-1">{studentId}</p>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl space-y-2 text-left">
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Course</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{course}</p>
              </div>
              <div className="flex justify-between items-end gap-3">
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Campus</p>
                  <p className="text-sm font-bold text-slate-900">{campus}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Validity</p>
                  <p className="text-[11px] font-black text-emerald-600">
                    {validFrom} - {validTo}
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-wide ${verificationTone}`}>
              {verificationState}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className={`w-2 h-2 rounded-full ${isSignatureValid ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-[11px] font-black text-[#00174b] uppercase tracking-widest">
                {isActive ? "Active Student" : "Restricted Student"}
              </span>
            </div>

            <p className="text-[10px] text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-200">
              Issued: {formattedIssuedAt}
            </p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Last verified: {lastVerifiedAt}
            </p>
          </div>

          <div className="flex md:justify-end">
            <div className="w-full md:w-auto flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="p-2 bg-white rounded-xl shadow-inner border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`}
                  alt="Verification QR Code"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-wider">Verified by ESMS</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
