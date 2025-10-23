import { useMemo, useState } from "react";

export function usePagination<T = any>(data: T[], itemPage = 10) {
  const [page, setPage] = useState(1);
  // math.ceil để làm tròn. tính tổng số trang
  const maxPage = Math.ceil(data.length / itemPage);

  const currentData = useMemo(() => {
    // vị trí ban đầu
    const start = (page - 1) * itemPage;
    // cắt ra mảng con gồm itemPage phần tử
    return data.slice(start, start + itemPage);
  }, [page, data, itemPage]);

  // trang tiếp
  const next = () => setPage((p) => Math.min(p + 1, maxPage)); // math.min không vượ quá maxPage
  // trang trước
  const prev = () => setPage((p) => Math.max(p - 1, 1)); // math.max không nhỏ hơn 1
  // nhảy đến trang cụ thể
  const jump = (p: number) => {
    const valid = Math.max(1, Math.min(p, maxPage));
    setPage(valid);
  };

  return {
    currentData, // dữ liệu trang hiện tại
    page, // trang hiện tại
    maxPage,
    next,
    prev,
    jump, // nhảy đến trang cụ thể
    setPage, // thay đổi page thủ công (nếu cần)
  };

  // khi dùng nè
  //   const {currentData, page, maxPage, next, prev, jump } = usePagination()
}
