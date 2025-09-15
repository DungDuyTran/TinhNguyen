import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z, { number } from "zod";

const ToChucSchema = z.object({
  id: z.number().int(),
  tenToChuc: z.string(),
  moTa: z.string(),
  website: z.string(),
  nguoiDaiDien: z.string(),
});

const handler = new CrudHandler(prisma.toChuc, ToChucSchema);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.getId(Number(params.id), { User: true });
}

export async function PUT(
  res: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await res.json();
  return handler.update(Number(params.id), data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
