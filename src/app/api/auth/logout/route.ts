import { deleteAuthCookie } from "@/utils/auth-cookie";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });
  await deleteAuthCookie(response.cookies);

  return response;
}
