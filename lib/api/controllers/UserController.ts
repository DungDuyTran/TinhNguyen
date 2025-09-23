import { User } from "@prisma/client";
import { BaseController } from "../base/BaseController";
import { UserService } from "../services/UserServices";

export class UserController extends BaseController<User> {
  constructor() {
    super(new UserService());
  }
}
