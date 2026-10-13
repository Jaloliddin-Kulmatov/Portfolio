import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifySession } from "./lib/auth";

// Everything under /admin needs a valid session, except the login page itself.
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/login")) return NextResponse.next();
  if (await verifySession(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin/:path*"] };
