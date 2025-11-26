// khi ứng dụng lớn lên thì cần có nhiều reducer
// nên cần kết hợp chúng lại

import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { ThemeActionTypes } from "./theme/theme.types";
import { counterReducer } from "./counter/counter.reducer";
import { CountActionTypes } from "./counter/counter.type";
import counterSlice from "./counterRTK/counterSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  counter: counterReducer,
  counterSlice: counterSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
// Export tất cả các actions mà RootReducer có thể xử lý.
export type RootAction = ThemeActionTypes | CountActionTypes; // Thay thế bằng ThemeActionTypes nếu chỉ có Theme
// export type RootAction = ThemeActionTypes | OtherActionTypes;
export default rootReducer;
