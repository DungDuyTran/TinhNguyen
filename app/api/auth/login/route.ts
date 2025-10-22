import { userRepository } from "@/lib/api/repositories/user.repository";
import { jwtService } from "@/lib/api/services/jwt.service";
import { setCsrfCookie } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

// kiểm tra email/p cấp access_Token và refresh_token
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await userRepository.findByEmail(email);
    if (!user?.password) {
      return NextResponse.json(
        { error: "Tài khoản này chưa có mật khẩu" },
        { status: 404 }
      );
    }
    const isMath = await userRepository.verifyPassword(password, user.password);
    if (!isMath) {
      return NextResponse.json({ error: "sai mật khẩu" }, { status: 401 });
    }

    // tạo token
    const accessToKen = jwtService.signAccessToken({ userId: user.id });
    const refeshToKen = jwtService.signRefreshToken({ userId: user.id });

    const csrfToken = await setCsrfCookie();
    // tạo response
    const res = NextResponse.json({
      message: "Đăng nhập thành công",
      csrfToken,
    });
    // tạo CSRF token & cookie
    // lưu cookie HTTPOnly (chống xss)
    res.cookies.set("access_token", accessToKen, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 7,
      path: "/",
    });
    res.cookies.set("refresh_token", refeshToKen, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    // httpOnly: true --> js không thế đọc cookie -> chống xss
    // secure : true --> cgir gửi cookie qua https
    // samesite: "strict" -> chống CSRF
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
