"use client";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { decrement, increment } from "@/lib/stores/counterRTK/counterSlice";
import { RootState } from "@/lib/stores/storeRTK";
import { useSelector } from "react-redux";

export function CounterRTK() {
  const counterRTK = useSelector(
    (state: RootState) => state.counterSlice.value
  );
  const dispatch = useAppDispatch();

  return (
    <div className="bg-red-500 shadow-lg rounded-xl p-5 w-[200px] ml-3 text-white">
      <h1 className="text-center font-semibold mb-4 text-xl text-yellow-300 ">
        Redux toolkit
      </h1>
      <h2 className="text-center font-semibold mb-4 ">
        Số lượng hiện tại: <span className="text-white">{counterRTK}</span>
      </h2>

      <div className="flex items-center justify-center gap-4">
        {/* Nút Giảm */}
        <button
          onClick={() => dispatch(decrement(3))}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow"
          disabled={counterRTK <= 0}
        >
          Giảm
        </button>

        {/* Nút Tăng */}
        <button
          onClick={() => dispatch(increment(1))}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow"
        >
          Tăng
        </button>
      </div>
    </div>
  );
}
