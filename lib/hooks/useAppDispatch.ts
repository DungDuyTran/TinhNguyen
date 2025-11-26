import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores/storeRTK";

// custom hook cho rtk
export const useAppDispatch = () => useDispatch<AppDispatch>();
