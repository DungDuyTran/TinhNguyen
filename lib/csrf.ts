import crypto from "crypto";
import { cookies } from "next/headers";
// quản lý CSRF token
export function createCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function setCsrfCookie() {
  const token = createCsrfToken();

  const cookieStore = await cookies(); // cần await
  cookieStore.set("csrf_token", token, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
}

export async function verifyCsrfToken(clientToken: string | null) {
  if (!clientToken) return false;
  const cookieStore = await cookies(); // cần await
  const cookieToken = cookieStore.get("csrf_token")?.value ?? null;
  if (!cookieToken) return false;

  //  Sửa lại so sánh sai logic của bạn
  return cookieToken === clientToken;
}
