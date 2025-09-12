import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const TinhNguyenVienShema = z.object({
  kyNang: z.string().nullable(),
  soThich: z.string().nullable(),
  thoiGianTanh: z.string().nullable(),
  tongBuoiDongGop: z.number().int(),
  UserId: z.number().int().positive(),
});

const handler = new CrudHandler(prisma.tinhNguyenVien, TinhNguyenVienShema);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.getId(Number(params.id), { User: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const Data = await req.json();
  return handler.update(Number(params.id), Data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
