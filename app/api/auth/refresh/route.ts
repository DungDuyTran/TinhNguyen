import { NextRequest, NextResponse } from "next/server";
import { jwtService } from "@/lib/api/services/jwt.service";

export async function POST(req: NextRequest) {
  try {
    // api này không nhận token từ body hay header
    // mà đọc từ cookie refresh_token
    // an toàn hơn local storage, vì cookie có thể gắn httpOnly
    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken)
      return NextResponse.json(
        { error: "Thiếu refresh token" },
        { status: 401 }
      );
    try {
      // DÙNG jwtService.veriftToken() để gaiir mã token
      // hợp lý -> trra về payloaf ( userId )
      // nếu hết hạn thì ném lỗi catch
      const decoded: any = jwtService.verifyToken(refreshToken);
      //tạo access token mới
      const newAccessToken = jwtService.signAccessToken({
        userId: decoded.userId,
      });

      // trả response và set cookie mới
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
