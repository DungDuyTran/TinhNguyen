import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrf_token");
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      error.response?.data?.error?.includes("Token")
    ) {
      originalRequest._retry = true;

      try {
        console.log("Access token hết hạn — đang gọi /api/auth/refresh...");
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        console.log("Refresh token thành công — thử lại request ban đầu");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại — đăng xuất người dùng");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function fetcher<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.get<T>(url, config);
  return response.data;
}

export async function request<T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.request<T>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}

export default api;
