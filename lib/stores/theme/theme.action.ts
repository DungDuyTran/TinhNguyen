// tạo hàm để khởi tạo Action

import { TOGGLE_THEME, ToggleThemeAction } from "./theme.types";
// tạo action
export const toggleTheme = (): ToggleThemeAction => ({
  type: TOGGLE_THEME,
});
