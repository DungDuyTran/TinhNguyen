"use client";

import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Axios instance dành cho các API có xác thực (JWT + CSRF)

export const apiSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // gửi cookie
});

// Interceptor tự động gắn CSRF Token vào header khi cần
apiSecure.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase() ?? "";

  if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    let csrfToken = Cookies.get("csrf_token");

    // Nếu chưa có token thì gọi backend để lấy
    if (!csrfToken) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/csrf`,
          { withCredentials: true }
        );
        csrfToken = res.data?.csrfToken;
        if (csrfToken) Cookies.set("csrf_token", csrfToken);
      } catch (error) {
        // không lấy được CSRF token thì tiếp tục những reqquest bị chặn
      }
    }

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }

  return config;
});

//requestSecure generic → dùng cho các API cần xác thực hoặc CSRF
export async function requestSecure<T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiSecure.request<T>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}
