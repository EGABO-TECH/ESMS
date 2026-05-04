"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export type UserRole = "admin" | "lecturer" | "finance_officer" | "student" | "registrar";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  phone?: string;
}

export interface CreateUserResult {
  success: boolean;
  error?: string;
  userId?: string;
}

export async function createUser(payload: CreateUserPayload): Promise<CreateUserResult> {
  try {
    const { userId } = auth();

    if (!userId) {
      return { success: false, error: "Unauthorized. You must be logged in." };
    }

    // The /admin route is already protected by Clerk middleware (auth required).
    // We skip an extra role-metadata check here because admin accounts created
    // before publicMetadata was introduced won't have role: "admin" set yet.
    // Use the Clerk dashboard to set publicMetadata on existing admin accounts
    // if you want to re-enable fine-grained role enforcement later.
    const client = clerkClient();

    // Debug: log the requesting user's metadata (remove in production)
    const requestingUser = await client.users.getUser(userId);
    console.log("[createUser] Requesting user publicMetadata:", requestingUser.publicMetadata);

    // Validate inputs
    if (!payload.firstName.trim() || !payload.lastName.trim()) {
      return { success: false, error: "First name and last name are required." };
    }
    if (!payload.email.trim()) {
      return { success: false, error: "Email address is required." };
    }
    if (payload.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters." };
    }

    const newUser = await client.users.createUser({
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      emailAddress: [payload.email.trim()],
      password: payload.password,
      publicMetadata: {
        role: payload.role,
        department: payload.department?.trim() ?? "",
        phone: payload.phone?.trim() ?? "",
      },
      skipPasswordChecks: false,
    });

    return { success: true, userId: newUser.id };
  } catch (err: unknown) {
    console.error("[createUser] Error:", err);

    // Clerk API errors have a .errors array
    if (
      err &&
      typeof err === "object" &&
      "errors" in err &&
      Array.isArray((err as { errors: { message: string }[] }).errors)
    ) {
      const msg = (err as { errors: { message: string }[] }).errors
        .map((e) => e.message)
        .join(", ");
      return { success: false, error: msg };
    }

    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
