// app/page.tsx
"use client";
import React from "react";
import { ThemeToggle } from "@/app/components/ThemeToggler";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const handleHome = () => {
    router.push("/giaodien/tinhnguyenvien");
  };
  return (
    // Body của trang sẽ được kiểm soát bởi ThemeWrapper (Client Component).

    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8">Demo Redux Theme Toggle</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <ThemeToggle />
        </div>
        <div>
          <button
            onClick={handleHome}
            className="px-4 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all "
          >
            quay về
          </button>
        </div>
      </div>
    </div>
  );
}
