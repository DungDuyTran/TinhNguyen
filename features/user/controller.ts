import { BaseController } from "@/lib/baseController";
import { UserService } from "./service";
import { NextResponse } from "next/server";

export class UserController extends BaseController<UserService> {
  constructor() {
    super(new UserService());
  }

  async getAll() {
    try {
      const users = await this.service.repository.findAll();
      return NextResponse.json({ data: users });
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async getById(id: number) {
    try {
      const user = await this.service.repository.findById(id);
      if (!user) throw new Error("User not found");
      return NextResponse.json({ data: user });
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async create(body: unknown) {
    try {
      const newUser = await this.service.createUser(body);
      return NextResponse.json({ data: newUser }, { status: 201 });
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async update(id: number, body: unknown) {
    try {
      const updated = await this.service.updateUser(id, body);
      return NextResponse.json({ data: updated });
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async delete(id: number) {
    try {
      await this.service.repository.delete(id);
      return NextResponse.json({ message: "id đã được xóa" });
    } catch (err: any) {
      return this.handleError(err);
    }
  }
}
