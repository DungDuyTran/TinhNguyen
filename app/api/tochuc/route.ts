import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import z from "zod";
// redis

export async function GET() {
  return handler.getAll({ User: true });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return handler.post(data);
}
