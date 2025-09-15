import { CrudHandler } from "@/lib/crudHandler";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const SukienSchema = z.object({
  tieuDe: z.string(),
  moTa: z.string(),
  diaDiem: z.string(),
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  soLuongToiDa: z.number().int(),
  soLuongToiThieu: z.number().int(),
});

const handler = new CrudHandler(prisma.suKien, SukienSchema);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.getId(Number(params.id));
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  return handler.update(Number(params.id), data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
