"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { deleteCurrentUser } from "@/app/actions/user";
import { Trash2 } from "lucide-react";

interface SidebarDeleteAccountButtonProps {
  className?: string;
  textClassName?: string;
}

export default function SidebarDeleteAccountButton({ className, textClassName }: SidebarDeleteAccountButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { signOut } = useClerk();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading("Deleting your account...");

    try {
      const result = await deleteCurrentUser();

      if (result.success) {
        toast.success("Account deleted successfully", { id: toastId });
        await signOut({ redirectUrl: "/login" });
      } else {
        throw new Error(result.error || "Failed to delete account");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred while deleting your account", { id: toastId });
      setIsDeleting(false);
    }
  };

  return (
    <div
      onClick={handleDelete}
      className={`${className || "flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer transition-colors"} ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <Trash2 size={20} />
      <span className={textClassName || "font-medium text-sm"}>{isDeleting ? "Deleting..." : "Delete Account"}</span>
    </div>
  );
}
