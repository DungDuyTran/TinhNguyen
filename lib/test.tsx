import axios, { AxiosRequestConfig } from "axios";
import { config } from "../middleware";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

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
  data: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.request<T>({ method, url, data, ...config });
  return response.data;
}
