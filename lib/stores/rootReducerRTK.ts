import { combineReducers } from "redux";
import counterSlice from "./counterRTK/counterSlice";

const rootReducerRTK = combineReducers({
  counterSlice: counterSlice,
});

export default rootReducerRTK;
//
