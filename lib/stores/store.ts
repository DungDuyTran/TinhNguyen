// lib/stores/store.ts
import { createStore, Store } from "redux";
import rootReducer from "./rootReducer";
import { saveThemeToLocalStorage } from "./theme/theme.reducer";
import { RootAction } from "./rootReducer";

// Khởi tạo Redux store.
export const store = createStore(rootReducer);

store.subscribe(() => {
  saveThemeToLocalStorage(store.getState().theme);
});

// Định nghĩa AppDispatch type bằng cách dùng Store và gán type cho nó
// Gán type Action cụ thể (RootAction) vào Dispatch để khắc phục lỗi TS2345
export type AppDispatch = typeof store.dispatch extends Store<any, infer A>
  ? (action: A | RootAction) => A | RootAction // type cuối cùng nếu điều kiện trên đúng
  : // AppDispatch: là một hàm nhận vào action
    // kiểu gốc là A hoặc action tùy chỉnh RootAction
    never;
// never: nếu điều kiện sai , appDispatch sẽ là never năng việc sử dụng nó và báo lỗi ngay lập tức
