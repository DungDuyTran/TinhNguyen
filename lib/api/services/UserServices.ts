import { User } from "@prisma/client";
import { BaseService } from "../base/BaseService";
import { UserRepository } from "../repositories/UserRepository";
import { UserSchema, UserType } from "../schemas/UserSchema";
// xss csrf cors
export class UserService extends BaseService<UserType> {
  constructor() {
    super(new UserRepository());
  }

  async create(data: unknown) {
    const parsed = UserSchema.parse(data);
    return super.create(parsed);
  }

  async update(id: number, data: unknown) {
    const parsed = UserSchema.parse(data);
    return super.update(id, parsed);
  }
}
