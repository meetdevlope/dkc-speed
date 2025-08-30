import { cookies } from "next/headers";

export async function createSession(token: string) {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
