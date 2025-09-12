import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { VaiTro } from "@prisma/client";
import { NextRequest } from "next/server";
import z, { email, number } from "zod";
import { id } from "zod/locales";

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
  const Data = await req.json();
  return handler.update(Number(params.id), Data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handler.deleted(Number(params.id));
}
