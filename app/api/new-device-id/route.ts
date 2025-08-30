import { NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET() {
  const id = v4();

  const response = NextResponse.json({ success: true, deviceId: id });
  response.cookies.set("dkc-device-id", id);

  return response;
}
