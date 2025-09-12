import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { VaiTro } from "@prisma/client";
import { NextRequest } from "next/server";
import z, { email } from "zod";

const UserSchema = z.object({
  firebaseUid: z.string(),
  hoTen: z.string(),
  email: z.string().optional(),
  sdt: z.string(),
  ngaySinh: z.coerce.date(),
  diaChi: z.string(),
  vaiTro: z.enum(["TinhNguyenVien", "ToChuc", "Admin"]),
  // VaiTro: z.enum([VaiTro.Admin, VaiTro.TinhNguyenVien, VaiTro.ToChuc]),
});

const handler = new CrudHandler(prisma.user, UserSchema);

export async function GET() {
  return handler.getAll();
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return handler.post(data);
}
