import axios from "axios";
import { AxiosRequestConfig } from "axios";

// fetcher<T> → dùng với SWR (chỉ GET).
// request<T> → dùng cho mọi method (GET, POST, PUT, DELETE).

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// fetcher generic: dùng cho SWR
// luôn get dữ liệu
// <T = any> để tự động gợi ý kiểu dữ liệu trả về
export async function fetcher<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.get<T>(url, config);
  return response.data;
}
// hàm resquest generic dùng cho mọi phương thức
// có thể truyền dữ liệu body + config
// <T = any> để type an toàn khi gọi
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
// Promise<T> = một gói dữ liệu sẽ có trong tương lai, kiểu của dữu liệu T
// Dùng await hoặc .then() đêt lấy giá trị thuwck từ promise

// export axios instance nếu muốn gọi trực tiếp
export default api;
