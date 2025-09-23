import { User } from "@prisma/client";
import { BaseService } from "../base/BaseService";
import { UserRepository } from "../repositories/UserRepository";

export class UserService extends BaseService<User> {
  constructor() {
    super(new UserRepository());
  }
}
