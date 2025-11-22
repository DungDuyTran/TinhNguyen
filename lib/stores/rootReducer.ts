// khi ứng dụng lớn lên thì cần có nhiều reducer
// nên cần kết hợp chúng lại

import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";

// vidu thêm
// Import các reducer khác nếu có (ví dụ: uiReducer, userReducer)
// import { uiReducer } from './ui.store';

const rootReducer = combineReducers({
  theme: themeReducer,
  // ui: uiReducer,
  // auth: authReducer
});

// định nghĩa dữ liệu của root state đẻ sử dụng trong useSelector
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
