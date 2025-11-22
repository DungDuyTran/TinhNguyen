// tạo store trung tâm của ứng dụng

import { createStore } from "redux";
import rootReducer from "./rootReducer";

// KHởi tạo Redux store
export const store = createStore(rootReducer);

// định nghĩa AppDispatch type ( Quan trọng cho ts)
export type AppDispatch = typeof store.dispatch;
