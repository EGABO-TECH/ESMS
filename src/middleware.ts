import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/login", "/enroll", "/api/clerk-webhook"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/favicon.ico"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
