import z, { any } from "zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { id } from "zod/locales";
import { error } from "console";

// crud generic
// T phải kêt thừa từ z.ZodTypeAny
// Nghĩa là có thể truyền vào bất cứ zod schema nào ( z.object. z.string..)
// và nó dùng để parse dữu liệu

export class CrudHandler<T extends z.ZodTypeAny> {
  private model: any; // model là đối tượng của prisma ( prisma.user, prisma.sanPham)
  // any vì mỗi model prisma là những kiểu khác nhau
  private schema: T; // generic truyền vào khi tạo crudHander

  constructor(model: any, schema: T) {
    // hàm khởi tạo nhận 2 tham số
    this.model = model; // prisma model -> model = prisma.sanpham
    this.schema = schema; // schema T --> schema = SanPhamSchema
  }
  async getAll(include: object = {}) {
    try {
      const data = await this.model.findMany({ include });
      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
  async getId(include: object = {}) {
    try {
      const data = await this.model.findUnique({ where: { id } });
      if (!data) {
        return NextResponse.json(
          { message: "Không có id này" },
          { status: 404 }
        );
      }
      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
  async post(body: unknown) {
    const Data = this.schema.safeParse(body);
    if (!Data.success) {
      return NextResponse.json({ error: Data.error }, { status: 400 });
    }
    try {
      const newData = await this.model.create({ data: Data.data });
      return NextResponse.json({ data: newData }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
  async update(id: number, body: unknown) {
    const Data = await this.model.safeParse(body);
    if (!Data.success) {
      return NextResponse.json({ error }, { status: 400 });
    }
    try {
      const newData = await this.model.update({
        where: { id },
        data: Data.data,
      });
      return NextResponse.json(
        { message: "update thành công" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
  async deleted(id: number) {
    try {
      const data = this.model.delete({ where: { id } });
      return NextResponse.json({ message: "Xóa thành công" }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
}
