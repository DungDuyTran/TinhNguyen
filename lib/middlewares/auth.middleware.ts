import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyCsrfToken } from "../csrf";

const SECRET = process.env.JWT_SECRET!;

/**
 * Middleware xác thực JWT & CSRF.
 * ------------------------------------------------------
 * - Chỉ xác thực token (không tự tạo token mới)
 * - Nếu token hết hạn hoặc không hợp lệ → 403
 */
export async function authMiddleware(req: NextRequest) {
  console.log("Bắt đầu xác thực...");

  // --- 1. Lấy JWT từ cookie hoặc header ---
  const headerToken = req.headers.get("authorization");
  const cookieToken = req.cookies.get("access_token")?.value;
  const token = headerToken?.startsWith("Bearer ")
    ? headerToken.replace("Bearer ", "")
    : cookieToken;

  console.log(" Token lấy được:", token || "Không thấy token");

  // 2. Nếu không có token
  if (!token) {
    console.warn("Thiếu access_token — yêu cầu đăng nhập lại");
    return NextResponse.json(
      { error: "Thiếu token hoặc chưa đăng nhập" },
      { status: 401 }
    );
  }

  // --- 3. Xác thực JWT ---
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Token hợp lệ, payload:", decoded);
  } catch (error: any) {
    console.error("Lỗi verify JWT:", error.message);
    return NextResponse.json(
      { error: "Token hết hạn hoặc không hợp lệ" },
      { status: 403 }
    );
  }

  // --- 4. Kiểm tra CSRF cho các phương thức ghi ---
  const method = req.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    console.log("Kiểm tra CSRF token...");

    const csrfHeader = req.headers.get("x-csrf-token");
    const csrfCookie = req.cookies.get("csrf_token")?.value;

    console.log("CSRF header:", csrfHeader, "| CSRF cookie:", csrfCookie);

    if (!csrfHeader || !csrfCookie) {
      return NextResponse.json({ error: "Thiếu CSRF token" }, { status: 403 });
    }

    if (csrfHeader !== csrfCookie) {
      return NextResponse.json(
        { error: "CSRF token không trùng khớp" },
        { status: 403 }
      );
    }

    const isValid = await verifyCsrfToken(csrfHeader);
    if (!isValid) {
      return NextResponse.json(
        { error: "CSRF token không hợp lệ" },
        { status: 403 }
      );
    }

    console.log("CSRF token hợp lệ");
  }

  // --- 5. Cho phép đi tiếp ---
  console.log("Cho phép request đi tiếp!");
  return NextResponse.next();
}
