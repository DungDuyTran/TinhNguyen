// khi ứng dụng lớn lên thì cần có nhiều reducer
// nên cần kết hợp chúng lại

import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { ThemeActionTypes } from "./theme/theme.types";

// vidu thêm
// Import các reducer khác nếu có (ví dụ: uiReducer, userReducer)
// import { uiReducer } from './ui.store';.

const rootReducer = combineReducers({
  theme: themeReducer,
  // ui: uiReducer,
  // auth: authReducer
});
export type RootState = ReturnType<typeof rootReducer>;
// Export tất cả các actions mà RootReducer có thể xử lý
export type RootAction = ThemeActionTypes; // Thay thế bằng ThemeActionTypes nếu chỉ có Theme
// export type RootAction = ThemeActionTypes | OtherActionTypes;
export default rootReducer;
