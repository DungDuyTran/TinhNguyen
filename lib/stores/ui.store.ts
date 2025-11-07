import { create } from "zustand";

interface UISate {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
export const useUIStore = create<UISate>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
