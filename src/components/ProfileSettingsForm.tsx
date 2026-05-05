"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Camera, Save, Loader2, CheckCircle } from "lucide-react";

interface ProfileSettingsFormProps {
  accentColor?: string; // e.g. "indigo", "emerald", "blue", "primary"
}

export default function ProfileSettingsForm({ accentColor = "indigo" }: ProfileSettingsFormProps) {
  const { user, isLoaded } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Map accent color to Tailwind classes
  const accent: Record<string, { ring: string; btn: string; badge: string }> = {
    indigo: {
      ring: "focus:ring-indigo-500",
      btn: "bg-indigo-600 hover:bg-indigo-700",
      badge: "bg-indigo-100 text-indigo-700",
    },
    emerald: {
      ring: "focus:ring-emerald-500",
      btn: "bg-emerald-600 hover:bg-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
    },
    blue: {
      ring: "focus:ring-blue-500",
      btn: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
    primary: {
      ring: "focus:ring-blue-500",
      btn: "bg-[#00174b] hover:bg-[#002266]",
      badge: "bg-blue-100 text-[#00174b]",
    },
  };

  const ac = accent[accentColor] ?? accent.indigo;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  const avatarSrc =
    previewUrl ||
    user?.imageUrl ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || "user"}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      // Upload image first if a new one is selected
      if (selectedFile) {
        await user.setProfileImage({ file: selectedFile });
      }

      // Update name fields
      await user.update({
        firstName: firstName.trim() || user.firstName || "",
        lastName: lastName.trim() || user.lastName || "",
      });

      setSaved(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setSaved(false), 3000);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            title="Change photo"
          >
            <Camera size={22} className="text-white" />
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <p className="font-black text-slate-900 text-lg">
              {user?.firstName || ""} {user?.lastName || ""}
            </p>
            <p className="text-sm text-slate-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-lg ${ac.badge} transition-all hover:opacity-80 active:scale-95`}
            >
              Change Photo
            </button>
            {selectedFile && (
              <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[160px]">
                {selectedFile.name}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400">JPG, PNG or GIF · Max 5 MB</p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ${ac.ring} transition-all text-sm font-semibold`}
            placeholder="First name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ${ac.ring} transition-all text-sm font-semibold`}
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email (read-only, managed by Clerk) */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Email Address
        </label>
        <input
          type="email"
          value={user?.primaryEmailAddress?.emailAddress || ""}
          disabled
          className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl outline-none text-sm text-slate-500 cursor-not-allowed"
        />
        <p className="text-[10px] text-slate-400">Email is managed by your institution and cannot be changed here.</p>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2.5 ${ac.btn} text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95`}
        >
          {isSaving ? (
            <><Loader2 size={18} className="animate-spin" /> Saving...</>
          ) : saved ? (
            <><CheckCircle size={18} /> Saved!</>
          ) : (
            <><Save size={18} /> Save Changes</>
          )}
        </button>
        {saved && (
          <span className="text-sm text-emerald-600 font-bold animate-in fade-in">
            Your profile has been updated across all portals.
          </span>
        )}
      </div>
    </div>
  );
}
