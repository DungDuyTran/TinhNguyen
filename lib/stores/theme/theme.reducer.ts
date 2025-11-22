// Reducer thuần để xử lý logic cập nhật state

import { ThemeState, ThemeActionTypes, TOGGLE_THEME } from "./theme.types";

// state ban đầu
const initialState: ThemeState = {
  isDarkMode: true, // mặc định là dark theme
};

// Reducer là hàm thuần : ( state , action) => newState

export function themeReducer(
  state = initialState,
  action: ThemeActionTypes
): ThemeState {
  switch (action.type) {
    case TOGGLE_THEME: // đảm bảo tính bất biến ( immutability) : trả về object Mới
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
}
