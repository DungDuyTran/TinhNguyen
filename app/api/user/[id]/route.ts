import { CrudHandler } from "@/lib/crudHandler";
import { prisma } from "@/lib/prisma";
import { UserController } from "@/features/user/controller";

const Controller = new UserController();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return Controller.getById(Number(params.id));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const Data = await req.json();
  return Controller.update(Number(params.id), Data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return Controller.delete(Number(params.id));
}
