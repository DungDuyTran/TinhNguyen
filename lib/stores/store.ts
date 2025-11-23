// lib/stores/store.ts
import { createStore, Store } from "redux";
import rootReducer from "./rootReducer";
import { saveThemeToLocalStorage } from "./theme/theme.reducer";
import { RootAction } from "./rootReducer"; // 👈 Import RootAction

// Khởi tạo Redux store.
export const store = createStore(rootReducer);

store.subscribe(() => {
  saveThemeToLocalStorage(store.getState().theme);
});

// Định nghĩa AppDispatch type bằng cách dùng Store và gán type cho nó
// Gán type Action cụ thể (RootAction) vào Dispatch để khắc phục lỗi TS2345
export type AppDispatch = typeof store.dispatch extends Store<any, infer A>
  ? (action: A | RootAction) => A | RootAction
  : never;

// HOẶC đơn giản hơn và thường dùng nhất:
// export type AppDispatch = (action: RootAction) => RootAction;

// Vì bạn đang dùng Redux thuần, hãy thử cách đơn giản hơn:
// export type AppDispatch = typeof store.dispatch; // (Giữ nguyên)

// Đảm bảo bạn sử dụng useAppDispatch hook (được type hóa) thay vì useDispatch
// trong các component nếu cách trên không loại bỏ được lỗi hoàn toàn.
