import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";
import { id } from "zod/locales";

const ChungNhanSchema = z.object({
  ngayCap: z.coerce.date(),
  fileChungNhan: z.string(),
  moTa: z.string(),
  SuKienId: z.number().int(),
});

const handler = new CrudHandler(prisma.chungNhan, ChungNhanSchema);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.getId(Number(params.id), { SuKien: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const Data = await req.json();
  return handler.update(Number(params.id), Data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
