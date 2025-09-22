import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "@/lib/apiClient";
import { error } from "console";

export function useApi<T>(url: string, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, options);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
