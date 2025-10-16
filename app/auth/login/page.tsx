"use client";
import { request } from "@/lib/api/axiosPublic";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await request("POST", "/api/auth/login", { email, password });
      alert(res.message || "Đăng nhập thành công");
    } catch (error: any) {
      alert(error.response?.data?.error || "sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Đăng nhập</h1>
      <input
        className="p-2 w-full rounded-2xl"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 w-full rounder"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
}
