// định nghĩa duwxx liệu cho state và actions

export interface ThemeState {
  isDarkMode: boolean;
}

// định nghĩa hằng số ( constants ) cho Action types
export const TOGGLE_THEME = "theme/toggleTheme";

// kiểu dữ liệu cho action
export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME;
}

// kiểu dữu liệu tổng hợp cho tất cả các action và theme
export type ThemeActionTypes = ToggleThemeAction;
