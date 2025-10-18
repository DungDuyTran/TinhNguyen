import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyCsrfToken } from "../csrf";

// middleware để bảo vệ route
// kiểm tra access_token cookie ( httpOnly)
// nếu request ghi Post put.... thì kiểm tra CSRF header
export async function authMiddleware(req: NextRequest) {
  // Lấy JWT từ cookie
  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  // Kiểm tra JWT
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return NextResponse.json(
      { error: "Token hết hạn hoặc không hợp lệ" },
      { status: 403 }
    );
  }

  // Kiểm tra CSRF token cho các request ghi (POST/PUT/PATCH/DELETE)
  // toUpperCase:  Đây là hàm của kiểu chuỗi (string) trong JavaScript dùng để chuyển toàn bộ ký tự sang chữ in hoa.
  const method = req.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    // "x-csrf-token" nghĩa là: “Token chống CSRF mà client gửi kèm header”.
    const csrfHeader = req.headers.get("x-csrf-token");
    const csrfCookie = req.cookies.get("csrf_token")?.value;

    if (!csrfHeader || !csrfCookie) {
      return NextResponse.json({ error: "Thiếu CSRF token" }, { status: 403 });
    }

    // Xác thực CSRF token (sử dụng hàm verifyCSRFToken)
    const isValid = await verifyCsrfToken(csrfHeader);
    if (!isValid) {
      return NextResponse.json(
        { error: "CSRF token không hợp lệ" },
        { status: 403 }
      );
    }
  }

  //Cho phép đi tiếp nếu hợp lệ
  return NextResponse.next();
}
