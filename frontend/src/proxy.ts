import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const soonPage = pathname === "/soon";

  // Calculate tomorrow midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // const countdownEnded = now.getTime() >= tomorrow.getTime();

  // If countdown hasn't ended, check for token
  // if (!countdownEnded) {
  //   if (!token && !soonPage) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   if (token && soonPage) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
