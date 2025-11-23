// lib/stores/theme/theme.reducer.ts
import {
  ThemeState,
  ThemeActionTypes,
  TOGGLE_THEME,
  SET_THEME_INITIAL,
  SetThemeInitialAction,
} from "./theme.types";

/**
 * 1. Định nghĩa INITIAL STATE TĨNH.
 * Phải là giá trị cố định (ví dụ: Dark Mode) để Server-Side Render (SSR)
 * khớp với lần render đầu tiên của Client, tránh lỗi Hydration.
 */
const initialState: ThemeState = { isDarkMode: true };

/**
 * 2. Hàm helper để tải trạng thái từ Local Storage.
 * Hàm này sẽ được gọi từ ThemeWrapper (Client Side) SAU Hydration.
 */
export const loadThemeFromLocalStorage = (): ThemeState | undefined => {
  // Chỉ chạy trên trình duyệt
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("themeState");
    if (serializedState === null) {
      return undefined; // Không có state đã lưu
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load theme state from localStorage", e);
    return undefined;
  }
};

// 3. Reducer Function: (state, action) => newState
export function themeReducer(
  state = initialState, // 👈 Luôn dùng trạng thái mặc định tĩnh
  action: ThemeActionTypes
): ThemeState {
  switch (action.type) {
    case TOGGLE_THEME:
      // đảm bảo tính bất biến ( immutability) : trả về object Mới
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    case SET_THEME_INITIAL: // 👈 Xử lý Action SET mới
      // Sử dụng payload để đặt trạng thái đã lưu
      return {
        ...state,
        isDarkMode: (action as SetThemeInitialAction).payload,
      };

    default:
      return state;
  }
}

/**
 * 4. Hàm helper để lưu trạng thái vào Local Storage.
 * Sẽ được gọi mỗi khi state thay đổi (trong store.subscribe).
 */
export const saveThemeToLocalStorage = (state: ThemeState) => {
  if (typeof window === "undefined") return; // Không lưu khi SSR

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("themeState", serializedState);
  } catch (e) {
    console.log("Could not save theme state to localStorage", e);
  }
};
