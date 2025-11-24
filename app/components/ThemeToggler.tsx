// app/components/ThemeToggle.tsx.
"use client";

import { RootState } from "@/lib/stores/rootReducer";
import { AppDispatch } from "@/lib/stores/store";
import { toggleTheme } from "@/lib/stores/theme/theme.action";
import { useDispatch, useSelector } from "react-redux";

export function ThemeToggle() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  const themeText = isDarkMode ? "Dark Mode" : "Light Mode";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  // Xác định classes cho component này (chỉ để minh họa)
  const buttonClasses = isDarkMode
    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    // Component này không cần tự thay đổi màu nền, nó chỉ chứa nút
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">
        Trạng thái hiện tại: {themeText}
      </h2>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${buttonClasses}`}
      >
        Chuyển sang {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
