"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function deleteCurrentUser() {
  try {
    const { userId } = auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Initialize clerk client and delete user
    const client = clerkClient();
    await client.users.deleteUser(userId);

    // Optional: If you have Supabase user data linked to Clerk userId, 
    // you would delete it here before returning success.
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete account" };
  }
}
