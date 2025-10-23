"use client";

import { useState, useCallback } from "react";
import { request } from "./api/axiosPublic";
import { error } from "console";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useAxios<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (method: HttpMethod, url: string, body?: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await request<T>(method, url, body);
        setData(result);
        return result;
      } catch (err: any) {
        const message =
          err.response?.data?.message ||
          err.reponse?.data?.error ||
          "Đã có lỗi";
        setError(message);
      } finally {
        setLoading(true);
      }
    },
    []
  );
  return { data, error, loading, fetchData };
}
