import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "chưa đăng nhập" }, { status: 401 });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    // cho phép đi tiếp nếu token hợp lệ
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Token hết hạn hoặc không hợp lệ" },
      { status: 403 }
    );
  }
}
