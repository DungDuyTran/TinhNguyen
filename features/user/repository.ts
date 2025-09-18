import { BaseRepository } from "@/lib/baseRepository";
import { UserType } from "./user.schema";
import { prisma } from "@/lib/prisma";

export class UserRepository extends BaseRepository<UserType> {
  constructor() {
    super(prisma.user);
  }
}
