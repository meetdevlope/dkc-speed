import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET() {
  const id = v4();
  const isExist = cookies().get("dkc-device-id")?.value;

  const response = NextResponse.json({ success: true });
  if (!isExist) {
    response.cookies.set("dkc-device-id", id);
  }

  return response;
}
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("dkc-device-id", "", {
    expires: new Date(0),
  });
  return response;
}
