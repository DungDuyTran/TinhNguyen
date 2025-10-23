import { useEffect, useState } from "react";

// useDebounce => trì hoãn cập nhật giá trị sau một khoảng deloy
// @param value : giá trị cần debounce
// @param deloy : thời gian delay (ms), mặc định 500ms

export function useDebounce<T = any>(value: T, delay = 500) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    // mỗi lần value thay đổi thì chờ deloy rồi mới cập nhật
    const timer = setTimeout(() => setDebounce(value), delay);
    // dọn timer khi value hoặc delay thay đổi
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounce;
}
// khi dùng
// const debouncedQuery = useDebounce(query, 600);
