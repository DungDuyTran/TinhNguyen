import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const ACCESS_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

export const jwtService = {
  // Tạo access token " thời gian sử dụng ngắn" ( dùng để truy cập api)
  signAccessToken(payload: object) {
    const options: SignOptions = { expiresIn: ACCESS_EXPIRES_IN as any };
    return jwt.sign(payload, JWT_SECRET, options);
  },

  // Tạo refresh token " dài" ( dùng để cấp lại access token )
  signRefreshToken(payload: object) {
    const options: SignOptions = { expiresIn: REFRESH_EXPIRES_IN as any };
    return jwt.sign(payload, JWT_SECRET, options);
  },

  // Xác thực token
  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  },
};
