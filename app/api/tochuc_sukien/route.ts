import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";

const ToChucSuKienSchema = z.object({
  ToChucId: z.number().int(),
  SuKienId: z.number().int(),
});

const handler = new CrudHandler(prisma.toChuc_SuKien, ToChucSuKienSchema);

export async function GET() {
  return handler.getAll({ ToChuc: true, SuKien: true });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return handler.post(data);
}
