import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });

  // ✅ Xóa cookie JWT
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
