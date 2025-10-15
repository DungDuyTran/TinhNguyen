import { authMiddleware } from "./lib/middlewares/auth.middleware";

export function middleware(req: any) {
  if (req.nextUrl.pathname.startsWith("/api/private")) {
    return authMiddleware(req);
  }
}

export const config = {
  matcher: ["/api/private/:path*"],
};
