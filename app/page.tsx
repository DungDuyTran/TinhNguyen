// app/page.tsx
"use client";
import React from "react";
// Đảm bảo đường dẫn import component là chính xác
import AnimatedSection from "@/app/components/AnimatedSection";

// Giữ lại các component Theme của bạn
import ThemeWrapper from "@/app/components/ThemeWrapper";
import { ThemeToggle } from "./components/ThemeToggler";
import { CounterRTK } from "./components/CounterRTK";

export default function HomePage() {
  return (
    <ThemeWrapper>
      <div className="flex flex-col justify-center items-center">
        <CounterRTK />
      </div>
    </ThemeWrapper>
  );
}
