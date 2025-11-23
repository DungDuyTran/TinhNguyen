// tạo hàm để khởi tạo Action

import {
  SET_THEME_INITIAL,
  SetThemeInitialAction,
  TOGGLE_THEME,
  ToggleThemeAction,
} from "./theme.types";
// tạo action.
export const toggleTheme = (): ToggleThemeAction => ({
  type: TOGGLE_THEME,
});
// tạo action SET_THEME_INITIAL (Sử dụng trong ThemeWrapper)
export const setThemeInitial = (
  isDarkMode: boolean
): SetThemeInitialAction => ({
  type: SET_THEME_INITIAL,
  payload: isDarkMode,
});
