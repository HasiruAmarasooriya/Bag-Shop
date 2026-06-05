import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin") && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL("/login?callbackUrl=/admin", req.url));
  }

  if (
    (path.startsWith("/account") || path === "/checkout") &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${path}`, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/checkout"],
};
