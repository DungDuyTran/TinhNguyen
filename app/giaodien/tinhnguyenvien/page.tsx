"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/giaodien/home");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleHome}
        className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        Đi đến giao diện Home
      </button>
    </div>
  );
};

export default Page;
