import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { TOKEN_COOKIE } from "@/lib/auth/cookie-name";

const protectedRoutes = [
  "/cart",
  "/checkout",
  "/orders",
  "/profile",
  "/payment-success",
];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/payment-success",
    "/login",
    "/register",
  ],
};
