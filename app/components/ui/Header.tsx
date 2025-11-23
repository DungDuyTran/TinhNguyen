"use client";
import { useUIStore } from "@/lib/stores/ui.store";

export function Header() {
  const openModal = useUIStore((state) => state.openModal);

  return (
    <header className="p-4 shadow flex justify-between items-center mt-5">
      <button
        onClick={openModal}
        className="px-3 py-1 bg-blue-700 text-white rounded"
      >
        Mở modal
      </button>
    </header>
  );
}
