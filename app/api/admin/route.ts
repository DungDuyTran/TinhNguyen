import { authMiddleware } from "@/lib/middlewares/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = authMiddleware(req, ["Admin"]);
  if (auth instanceof NextResponse) return auth;

  return NextResponse.json({ message: "Chào mừng admin" }, { status: 200 });
}
