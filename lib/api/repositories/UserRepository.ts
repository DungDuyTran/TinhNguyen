import { User } from "@prisma/client";
import { BaseRepository } from "../base/BaseRepository";
import { prisma } from "@/lib/prisma";
import { UserSchema } from "../schemas/UserSchema";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }
}
