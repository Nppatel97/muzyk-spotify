import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow request if token is valid or request is for next auth session
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to login page otherwise
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// Workaround because of a bug in Nextjs
export const config = {
  matcher: "/",
};
