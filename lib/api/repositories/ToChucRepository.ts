import { ToChuc } from "@prisma/client";
import { BaseRepository } from "../base/BaseRepository";
import { prisma } from "@/lib/prisma";

export class ToChucRepository extends BaseRepository<ToChuc> {
  constructor() {
    super(prisma.toChuc);
  }
}
