import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";

  if (!token && !isLoginPage) {
    console.log("sem token e nao é login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    console.log("tem token e é login page");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("nao fez nada");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
