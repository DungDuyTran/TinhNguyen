import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middlewares/auth.middleware";
export const runtime = "nodejs";
/**
 * Middleware trung tâm:
 * - Bảo vệ toàn bộ API (trừ các route công khai)
 * - Kiểm tra JWT
 * - Kiểm tra CSRF token (cho các phương thức ghi)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //Các route công khai — không yêu cầu đăng nhập
  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/csrf",
    "/api/auth/refresh",
  ];

  // Nếu là route công khai → bỏ qua middleware
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Còn lại: yêu cầu xác thực và CSRF
  return authMiddleware(req);
}

/**
 * Cấu hình route matcher
 *  → Áp dụng cho tất cả các API routes (/api/**)
 */
export const config = {
  matcher: ["/api/:path*"],
};
