// app/page.tsx
"use client";
import React from "react";
// Đảm bảo đường dẫn import component là chính xác
import AnimatedSection from "@/app/components/AnimatedSection";

// Giữ lại các component Theme của bạn
import ThemeWrapper from "@/app/components/ThemeWrapper";
import { ThemeToggle } from "./components/ThemeToggler";

export default function HomePage() {
  return (
    <ThemeWrapper>
      {/* Container chính: thêm khoảng trống, căn giữa */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        {/* Nút chuyển đổi Theme nằm ở góc trên bên phải */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Component Animation chính */}
        <AnimatedSection
          title="Tích Hợp GSAP Hoàn Hảo!"
          description="Sử dụng useLayoutEffect và GSAP Context đảm bảo animation hoạt động mượt mà ở 60fps và không gây rò rỉ bộ nhớ (memory leaks) khi component bị unmount."
        />

        {/* Bạn có thể thêm các component khác ở đây nếu cần */}
        <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">
          Hãy refresh trang để xem lại animation!
        </p>
      </div>
    </ThemeWrapper>
  );
}
