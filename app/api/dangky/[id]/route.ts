import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";
import { da } from "zod/locales";

const DangKySchema = z.object({
  trangThai: z.enum(["choDuyet", "chapNhan", "tuChoi", "daThamGia", "vangMat"]),
  ngayDangKy: z.coerce.date().optional(),
  ngayXacNhan: z.coerce.date().optional(),
  suKienId: z.number().int(),
  tinhNguyenVienId: z.number().int(),
});

const handler = new CrudHandler(prisma.dangKy, DangKySchema);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handler.getId(Number(params.id), {
    suKien: true,
    tinhNguyenVien: true,
  });
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  return handler.update(Number(params.id), data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
