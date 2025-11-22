"use client";

import { RootState } from "@/lib/stores/rootReducer";
import { AppDispatch } from "@/lib/stores/store";
import { toggleTheme } from "@/lib/stores/theme/theme.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function ThemeToggle() {
  // 1. lấy state từu store ( useSelector)
  // TS biết kiểu dữ liệu của state là ThemeState nhờ RootState
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  // 2. lấy hàm dispatch
  const dispatch = useDispatch<AppDispatch>();
  const themeText = isDarkMode ? "Dark Mode" : "Light Mode";
  const handleToggle = () => {
    // 3. Dispatch action để thay đổi state
    dispatch(toggleTheme());
  };
  return (
    <div>
      <h2>Trạnh thái hiện tại : {themeText}</h2>
      <button onClick={handleToggle}>
        chuyển sang {isDarkMode ? "Light mode" : "Dark Mode"}
      </button>
    </div>
  );
}
