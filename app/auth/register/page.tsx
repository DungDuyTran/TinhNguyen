"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "@/lib/api/axiosPublic";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hoTen || !formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const res = await request("POST", "/api/auth/register", formData);
      alert(res.message || "Đăng ký thành công!");
      router.push("/auth/login");
    } catch (err: any) {
      alert("đăng ký thất bại -- trùng email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Ảnh nền */}
      <img
        src="/dangky.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <div className="bg-[rgb(202,177,101)] bg-opacity-60 p-10 rounded-lg w-[400px] opacity-95 shadow-xl">
          <h1 className="text-6xl font-bold text-white mb-8 text-center drop-shadow-md">
            Đăng ký
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-white text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[rgb(125,105,44)] hover:bg-[rgb(155,134,72)] text-white font-semibold py-3 rounded disabled:opacity-50 transition duration-200"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-8 text-black text-center text-sm">
            Đã có tài khoản?{" "}
            <a
              className="text-white hover:underline hover:text-gray-200"
              href="/auth/login"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
