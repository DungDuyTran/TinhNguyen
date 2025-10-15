import { userRepository } from "@/lib/api/repositories/user.repository";
import { VaiTro } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, hoTen } = await req.json();
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "email đã tông tài" }, { status: 400 });
  }
  const newUser = await userRepository.createUser({
    email,
    password,
    hoTen,
    vaiTro: VaiTro.TinhNguyenVien,
  });
  return NextResponse.json({ massage: "Đăng ký thành công", user: newUser });
}
