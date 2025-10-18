"use client";
import { useState } from "react";
import { request } from "@/lib/api/axiosPublic";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Xử lý nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  // Gửi yêu cầu đăng nhập API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("⚠️ Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const res = await request("POST", "/api/auth/login", formData);
      alert(res.message || "Đăng nhập thành công");
      router.push("/giaodien");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "❌ Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Ảnh nền */}
      <img
        src="/dangKy.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center w-full h-full opacity-95">
        <div className="bg-[rgb(226,221,192)] bg-opacity-60 p-10 rounded-lg w-[400px] shadow-xl">
          <h1 className="text-4xl font-bold text-[rgb(183,172,109)] mb-8 text-center">
            Đăng nhập
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-4 rounded bg-[rgb(207,198,149)] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-[rgb(207,198,149)] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <a
              href="#"
              className="flex justify-center ml-2 mt-[-5px] text-[rgb(150,138,68)] hover:text-[rgb(121,110,49)] hover:underline"
            >
              Quên mật khẩu ?
            </a>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[rgb(150,138,68)] hover:bg-[rgb(154,144,91)] text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-8 text-gray-400 text-center text-sm">
            Chưa có tài khoản?{" "}
            <a
              className="text-[rgb(138,130,84)] hover:underline"
              href="/auth/register"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
