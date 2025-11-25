"use client";

import { decrement, increments } from "@/lib/stores/counter/counter.action";
import { RootState } from "@/lib/stores/rootReducer";
import { useDispatch, useSelector } from "react-redux";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="bg-red-500 shadow-lg rounded-xl p-5 w-[200px] ml-3 text-white">
      <h2 className="text-center font-semibold mb-4 ">
        Số lượng hiện tại: <span className="text-white">{count}</span>
      </h2>

      <div className="flex items-center justify-center gap-4">
        {/* Nút Giảm */}
        <button
          onClick={() => dispatch(decrement(1))}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow"
        >
          Giảm
        </button>

        {/* Nút Tăng */}
        <button
          onClick={() => dispatch(increments(1))}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow"
        >
          Tăng
        </button>
      </div>
    </div>
  );
}
