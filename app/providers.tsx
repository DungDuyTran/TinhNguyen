"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/stores/store";
import ThemeWrapper from "./components/ThemeWrapper";
import { storeRDTK } from "@/lib/stores/storeRTK";
import { Store } from "redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Bước 1: Redux Provider cung cấp Store cho toàn bộ ứng dụng
    <Provider store={store}>
      {/* Bước 2: ThemeWrapper đọc State (isDarkMode) từ Store
        và áp dụng các classes Tailwind cho giao diện.
        Nó phải nằm BÊN TRONG Provider để có thể sử dụng useSelector.
      */}
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
