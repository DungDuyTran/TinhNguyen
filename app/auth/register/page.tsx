"use client";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { useRegister } from "@/lib/hooks/useRegister";

export default function RegisterPage() {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegister();
  return (
    <RegisterForm
      formData={formData}
      error={error}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
