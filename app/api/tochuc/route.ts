import { authMiddleware } from "@/lib/middlewares/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = authMiddleware(req, ["ToChuc", "Admin"]);
  if (auth instanceof NextResponse) return auth;

  return NextResponse.json(
    { message: "Tổ chức được phép tạo sự kiện" },
    { status: 200 }
  );
}
