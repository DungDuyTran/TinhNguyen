import { BaseService } from "@/lib/baseService";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./repository";
import { error } from "console";

export class UserService extends BaseService<
  UserRepository,
  typeof UserSchema
> {
  constructor() {
    super(new UserRepository(), UserSchema);
  }
  async createUser(data: unknown) {
    const parsed = this.schema.safeParse(data);
    if (!parsed.success) throw new Error("Invalid user data");
    return this.repository.create(parsed.data);
  }
  async updateUser(id: number, data: unknown) {
    const parsed = this.schema.partial().safeParse(data);
    if (!parsed.success) throw new Error("Invalid user update");
    return this.repository.update(id, parsed.data);
  }
}
