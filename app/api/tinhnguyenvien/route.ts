import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";

const TinhNguyenVienShema = z.object({
  id: z.number().int().positive(),
  kyNang: z.string().nullable(),
  soThich: z.string().nullable(),
  thoiGianTanh: z.string().nullable(),
  tongBuoiDongGop: z.number().int(),
});

const handler = new CrudHandler(prisma.tinhNguyenVien, TinhNguyenVienShema);

export async function GET() {
  return handler.getAll();
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return handler.post(data);
}
