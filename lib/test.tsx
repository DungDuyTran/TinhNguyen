"use client";
import { error } from "console";
import { create } from "zustand";
interface Authstate {
  formData: { email: string; password: string };
  error: string;
  loading: boolean;

  setFormData: (data: Partial<{ email: string; password: string }>) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;

  registerData: { hoTen: string; email: string; password: string };
  setRegisterData: (
    data: Partial<{ hoTen: string; email: string; password: string }>
  ) => void;
}

export const useAuthStoree = create<Authstate>((set) => ({
  formData: { email: "", password: "" },
  error: "",
  loading: false,
  registerData: { hoTen: " ", email: "", password: "" },

  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setRegisterData: (data) =>
    set((state) => ({ registerData: { ...state.registerData, ...data } })),
}));
