import { CrudHandler } from "@/lib/crudHandler";
import z from "zod";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  return handler.getAll();
}

export async function POST(req: Request) {
  const data = await req.json();
  return handler.post(data);
}
