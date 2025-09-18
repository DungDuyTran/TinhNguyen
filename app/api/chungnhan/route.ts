import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";

const ChungNhanSchema = z.object({
  ngayCap: z.coerce.date(),
  fileChungNhan: z.string(),
  moTa: z.string(),
  SuKienId: z.number().int(),
});

const handler = new CrudHandler(prisma.chungNhan, ChungNhanSchema);

export async function GET() {
  return handler.getAll({ SuKien: true });
}

export async function POST(req: NextRequest) {
  const Data = await req.json();
  return handler.post(Data);
}
