// app/page.tsx
import React from "react";
import { ThemeToggle } from "@/app/components/ThemeToggler";

export default function HomePage() {
  return (
    // Body của trang sẽ được kiểm soát bởi ThemeWrapper (Client Component)

    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8">Demo Redux Theme Toggle</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Vị trí của Theme Toggle */}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
