import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("dkc-token", token);

  return response;
}
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("dkc-token", "", {
    expires: new Date(0), // Expire the cookie immediately
  });
  return response;
}
