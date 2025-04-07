import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export type TokenData = {
  username: string;
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/portal/", req.url));
  }

  try {
    const decoded = jose.jwtVerify(token, SECRET);
    const response = NextResponse.next();
    response.cookies.set("tokenData", JSON.stringify(decoded));

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/portal/", req.url));
  }
}

// Apply only to protected routes
export const config = {
  matcher: ["/portal/dashboard/:path*"], // protect these
};
