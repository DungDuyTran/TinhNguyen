"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { request } from "./api/axiosPublic";

import React from "react";

export default function Signup() {
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
    if (!formData.hoTen || !formData.email || formData.password) {
      setError("Nhập đủ thông tin đi cha ơi cha");
      return;
    }
    setLoading(true);
    try {
      const res = await request("POST", "/api/auth/register", formData);
      alert(res.message || "Đăng ký thành công");
      router.push("/auth/login");
    } catch (error) {
      alert("đăng ký thất bại");
      console.error();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="hoTen"
          value={formData.hoTen}
          onChange={handleChange}
          placeholder="Họ và Tên"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          type="text"
          name="mật khẩu"
          value={formData.password}
          onChange={handleChange}
          placeholder="mật khẩu"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
