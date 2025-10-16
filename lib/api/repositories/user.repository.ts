// lớp giao tiếp với db
// Tạo findByEmail -- createUsser() có hash mật khẩu -- verifiPw

import { prisma } from "@/lib/prisma";
import { Prisma, VaiTro } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export const userRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async createUser(data: {
    email: string;
    password: string;
    hoTen: string;
    vaiTro?: VaiTro;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const userData: Prisma.UserCreateInput = {
      firebaseUid: randomUUID(),
      hoTen: data.hoTen,
      email: data.email,
      password: hashed,
      vaiTro: data.vaiTro || VaiTro.TinhNguyenVien,
    };

    return prisma.user.create({
      data: userData,
    });
  },

  async verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
};
