"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { deleteCurrentUser } from "@/app/actions/user";
import { Trash2 } from "lucide-react";

export default function DeleteAccountButton() {
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
    <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
          <p className="text-sm text-red-700 mt-1 max-w-md">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all shadow-sm"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
