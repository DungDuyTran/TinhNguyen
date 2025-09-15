import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";

const DangKySchema = z.object({
  trangThai: z.enum(["choDuyet", "chapNhan", "tuChoi", "daThamGia", "vangMat"]),
  ngayDangKy: z.coerce.date().optional(),
  ngayXacNhan: z.coerce.date().optional(),
  suKienId: z.number().int(),
  tinhNguyenVienId: z.number().int(),
});

const handler = new CrudHandler(prisma.dangKy, DangKySchema);

export async function GET() {
  return handler.getAll({ suKien: true, tinhNguyenVien: true });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return handler.post(data);
}
