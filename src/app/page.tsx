import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function RootPage() {
  const { userId, sessionClaims } = auth();
  
  if (!userId) {
    redirect("/login");
  }

  const ROLE_HOME: Record<string, string> = {
    ADMIN:     '/admin',
    STUDENT:   '/student/dashboard',
    LECTURER:  '/lecturer',
    REGISTRAR: '/registrar',
    FINANCE:   '/finance',
  };

  // Try from session claims
  const roleFromClaims = (sessionClaims?.publicMetadata as any)?.role;
  if (roleFromClaims) {
    const normalizedRole = roleFromClaims.toUpperCase();
    if (ROLE_HOME[normalizedRole]) {
      redirect(ROLE_HOME[normalizedRole]);
    }
  }

  // If no role in metadata, redirect to login page where client-side 
  // check might find it in unsafeMetadata
  redirect("/login");
}

