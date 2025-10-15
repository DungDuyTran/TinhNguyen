import { userRepository } from "@/lib/api/repositories/user.repository";
import { jwtService } from "@/lib/api/schemas/jwt.service";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { is } from "zod/locales";

export async function POST(req: NextRequest) {
  const { email, password, hoTen } = await req.json();
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
  const res = NextResponse.json({ message: "Đăng nhập thành công" });
  // lưu cookie HTTPOnly (chống xss)
  res.cookies.set("access_token", accessToKen, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  res.cookies.set("refresh_token", refeshToKen, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  // httpOnly: true --> js không thế đọc cookie -> chống xss
  // secure : true --> cgir gửi cookie qua https
  // samesite: "strict" -> chống CSRF
  return res;
}
