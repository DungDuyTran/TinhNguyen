import { configureStore } from "@reduxjs/toolkit";
import rootReducerRTK from "./rootReducerRTK";

// cấu hình Stỏe (mà RTK tự động thêm DevTools và thunk )
export const storeRDTK = configureStore({
  reducer: rootReducerRTK,
});
// định nghãi types cho toàn ứng dụng
export type RootState = ReturnType<typeof storeRDTK.getState>;
export type AppDispatch = typeof storeRDTK.dispatch;
//
