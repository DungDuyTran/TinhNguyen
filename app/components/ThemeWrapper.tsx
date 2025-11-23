// app/components/ThemeWrapper.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/stores/rootReducer";
import React, { useEffect, useState } from "react";
import { loadThemeFromLocalStorage } from "@/lib/stores/theme/theme.reducer";
import { setThemeInitial } from "@/lib/stores/theme/theme.action";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  // 1. Trạng thái để theo dõi liệu Local Storage đã được đọc chưa
  const [isLoaded, setIsLoaded] = useState(false); // Bắt đầu là FALSE

  useEffect(() => {
    // Logic này chỉ chạy một lần SAU khi component được gắn kết (mounted)
    const savedState = loadThemeFromLocalStorage();

    if (savedState !== undefined) {
      // 2. Nếu tìm thấy trạng thái đã lưu, CẬP NHẬT Redux Store ngay lập tức
      // Dùng action SET_THEME_INITIAL để đặt giá trị đúng
      dispatch(setThemeInitial(savedState.isDarkMode));
    }

    // 3. Đánh dấu rằng việc tải Local Storage đã hoàn tất
    setIsLoaded(true);
  }, []);

  // Áp dụng lớp CSS dựa trên Redux state
  const wrapperClasses = isDarkMode
    ? "bg-gray-900 text-gray-100 min-h-screen transition-colors duration-500"
    : "bg-gray-50 text-gray-900 min-h-screen transition-colors duration-500";

  // 4. KIỂM TRA isLoaded TRƯỚC KHI RENDER
  if (!isLoaded) {
    return null;
  }
  return (
    // Render wrapper với classes sau khi isLoaded là truê
    <div className={wrapperClasses}>{children}</div>
  );
}
