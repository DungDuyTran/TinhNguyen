import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyCsrfToken } from "../csrf";

const SECRET = process.env.JWT_SECRET!;

/*
 * Middleware xác thực người dùng qua JWT & CSRF token
 * - Kiểm tra access_token từ cookie hoặc header
 * - Verify signature và hạn sử dụng của JWT
 * - Xác minh CSRF token nếu là request ghi
 */
export async function authMiddleware(req: NextRequest) {
  console.log("- Bắt đầu xác thực...");

  // --- 1. Lấy JWT token ---
  const headerToken = req.headers.get("authorization");
  const cookieToken = req.cookies.get("access_token")?.value;
  const token = headerToken?.startsWith("Bearer ")
    ? headerToken.replace("Bearer ", "")
    : cookieToken;
  console.log("- token: " + token);

  if (!token) {
    console.log(" không có JWT token — cần đăng nhập lại.");
    return NextResponse.json(
      { error: "Thiếu token hoặc chưa đăng nhập." },
      { status: 401 }
    );
  }

  // --- 2️. Xác thực JWT ---
  try {
    const decoded = jwt.verify(token, SECRET) as any;

    console.log("- Token hợp lệ!");
    console.log("     - > Payload:", decoded);
    console.log("     - > iat:", new Date(decoded.iat * 1000).toLocaleString());
    console.log("     - > exp:", new Date(decoded.exp * 1000).toLocaleString());

    // Gắn userId vào request (có thể dùng trong API route)
    (req as any).user = decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.error(" Token đã hết hạn:", error.message);
      return NextResponse.json({ error: "JWT đã hết hạn." }, { status: 401 });
    }
    if (error.name === "JsonWebTokenError") {
      console.error(" Token không hợp lệ:", error.message);
      return NextResponse.json({ error: "JWT không hợp lệ." }, { status: 403 });
    }

    console.error("Lỗi xác thực JWT khác:", error.message);
    return NextResponse.json({ error: "Lỗi xác thực JWT." }, { status: 403 });
  }

  // 3️. Xác minh CSRF token nếu là phương thức ghi
  const method = req.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    console.log("- Kiểm tra CSRF token...");

    const csrfHeader = req.headers.get("x-csrf-token");
    const csrfCookie = req.cookies.get("csrf_token")?.value;

    console.log("     - > CSRF header:", csrfHeader);
    console.log("     - > CSRF cookie:", csrfCookie);

    if (!csrfHeader || !csrfCookie) {
      console.warn(" Thiếu CSRF token trong header hoặc cookie.");
      return NextResponse.json({ error: "Thiếu CSRF token." }, { status: 403 });
    }

    if (csrfHeader !== csrfCookie) {
      console.warn(" CSRF token không trùng khớp.");
      return NextResponse.json(
        { error: "CSRF token không trùng khớp." },
        { status: 403 }
      );
    }

    const isValid = await verifyCsrfToken(csrfHeader);
    if (!isValid) {
      console.warn("- CSRF token không hợp lệ hoặc đã hết hạn.");
      return NextResponse.json(
        { error: "CSRF token không hợp lệ hoặc hết hạn." },
        { status: 403 }
      );
    }

    console.log("- CSRF token hợp lệ.");
  }

  // --- 4️. Cho phép request đi tiếp ---
  console.log("- Xác thực thành công ---- Cho phép request đi tiếp.");
  return NextResponse.next();
}
