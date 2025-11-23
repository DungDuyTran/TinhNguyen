"use client";
import { useUIStore } from "@/lib/stores/ui.store";

export function Modal() {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const closeModal = useUIStore((state) => state.closeModal);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-gray-200 p-6 rounded shadow-xl">
        <p className="mb-4 text-gray-800">Modal đang mở!</p>
        <button
          onClick={closeModal}
          className="bg-amber-600 text-white px-4 py-2 rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
