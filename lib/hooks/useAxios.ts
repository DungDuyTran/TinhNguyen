"use client";

import { useState, useCallback } from "react";
import { request } from "@/lib/api/axiosPublic";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Custom hook chung cho mọi API
export function useAxios<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Gọi API theo method, url, body, config
  const fetchData = useCallback(
    async (method: HttpMethod, url: string, body?: any) => {
      setLoading(true);
      setError(null);

      try {
        const result = await request<T>(method, url, body);
        setData(result);
        return result; // trả về cho component nếu cần
      } catch (err: any) {
        console.error("API Error:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Có lỗi xảy ra!";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, fetchData };
}
