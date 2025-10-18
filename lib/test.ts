import { hex } from "zod";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function createCSRFToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function GET() {
  const token = createCSRFToken();
  const cookieStore = await cookies();

  cookieStore.set("csrf_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return NextResponse.json({ csrfToken: token });
}
