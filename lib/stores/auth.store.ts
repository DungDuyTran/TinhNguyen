"use client";

import { create } from "zustand";

interface AuthState {
  // state login
  formData: { email: string; password: string };
  error: string;
  loading: boolean;

  // state register
  registerData: { hoTen: string; email: string; password: string };

  // hàm xử lý cho login
  setFormData: (data: Partial<{ email: string; password: string }>) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;

  // hàm xử lý register
  setRegisterData: (
    data: Partial<{ hoTen: string; email: string; password: string }>
  ) => void;
}
// tạo store zustand
export const useAuthStore = create<AuthState>((set) => ({
  formData: { email: "", password: "" },
  error: "",
  loading: false,
  registerData: { hoTen: "", email: "", password: "" },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  setRegisterData: (data) =>
    set((state) => ({
      registerData: { ...state.registerData, ...data },
    })),
}));
