import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDecodedCookies } from "./utils/jwt";

export type TokenData = {
  username: string;
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/portal?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  try {
    const decoded = await getDecodedCookies(token);
    const response = NextResponse.next();
    response.cookies.set("tokenData", JSON.stringify(decoded));

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL(`/portal?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }
}

// Apply only to protected routes
export const config = {
  matcher: ["/portal/dashboard/:path*"], // protect these
};
