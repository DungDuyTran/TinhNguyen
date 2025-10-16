import { NextRequest, NextResponse } from "next/server";
import { jwtService } from "@/lib/api/services/jwt.service";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken)
      return NextResponse.json(
        { error: "Thiếu refresh token" },
        { status: 401 }
      );

    try {
      const decoded: any = jwtService.verifyToken(refreshToken);
      const newAccessToken = jwtService.signAccessToken({
        userId: decoded.userId,
      });
      const res = NextResponse.json({ message: "Cấp token mới thành công" });
      res.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      return res;
    } catch {
      return NextResponse.json(
        { error: "Refresh token hết hạn" },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
