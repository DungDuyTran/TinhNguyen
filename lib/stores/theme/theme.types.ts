// định nghĩa duwxx liệu cho state và actions

export interface ThemeState {
  isDarkMode: boolean;
}

// định nghĩa hằng số ( constants ) cho Action types.
export const TOGGLE_THEME = "theme/toggleTheme";
export const SET_THEME_INITIAL = "theme/setInitial";
// kiểu dữ liệu cho action
export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME;
}
// Kiểu dữ liệu cho action SET_THEME_INITIAL
export interface SetThemeInitialAction {
  type: typeof SET_THEME_INITIAL;
  payload: boolean; // Giá trị isDarkMode mới
}

// kiểu dữu liệu tổng hợp cho tất cả các action và theme
export type ThemeActionTypes = ToggleThemeAction | SetThemeInitialAction;
