import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    cookieName: "auth-token", // Lấy JWT từ cookie
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Chuyển hướng nếu chưa đăng nhập
  }

  return NextResponse.next();
}

// ✅ Chạy middleware cho tất cả route bắt đầu bằng "/dashboard"
export const config = {
  matcher: "/dashboard/:path*",
};
