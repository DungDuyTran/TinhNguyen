"use client";

import { request } from "@/lib/api/axiosPublic";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useState, useEffect } from "react";

type User = {
  id: number;
  hoTen: string;
  email?: string;
};

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]); // luôn mảng rỗng
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceQuery = useDebounce(query, 600);

  useEffect(() => {
    if (!debounceQuery.trim()) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await request<User[] | { users: User[] }>(
          "GET",
          `/users?search=${debounceQuery}`
        );

        const result = Array.isArray(data)
          ? data
          : (data as { users?: User[] }).users ?? [];

        setUsers(result);
      } catch (error: any) {
        setError(error.response?.data?.message || "Lỗi khi tải dữ liệu");
        setUsers([]); //  fallback tránh undefined
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debounceQuery]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">
        🔍 Tìm kiếm người dùng (Axios + Debounce)
      </h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nhập tên người dùng..."
        className="border p-2 w-full rounded mb-3"
      />

      {loading && <p className="text-gray-500">Đang tìm kiếm...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-3 space-y-2">
        {users && users.length > 0
          ? users.map((u) => (
              <li
                key={u.id}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                <p className="font-semibold">{u.hoTen}</p>
                <p className="text-sm text-gray-600">
                  {u.email || "Không có email"}
                </p>
              </li>
            ))
          : !loading && <p className="text-gray-500">Không tìm thấy kết quả</p>}
      </ul>
    </div>
  );
}
