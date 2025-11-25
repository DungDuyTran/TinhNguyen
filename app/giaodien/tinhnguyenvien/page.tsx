"use client";

import { Counter } from "@/app/components/Counter";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleToggle = () => {
    router.push("/giaodien/toggle");
  };

  const handleHome = () => {
    router.push("/giaodien/home");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      {/* Hàng chứa 2 nút */}
      <div className="flex gap-5">
        <button
          onClick={handleHome}
          className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Đi đến giao diện Home
        </button>

        <button
          onClick={handleToggle}
          className="px-4 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
        >
          Toggle
        </button>
      </div>

      {/* Counter nằm phía dưới */}
      <Counter />
    </div>
  );
};

export default Page;
