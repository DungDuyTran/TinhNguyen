import { NextRequest } from "next/server";
import { UserController } from "@/lib/api/controllers/UserController";

const controller = new UserController();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return controller.getById(Number(params.id));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return controller.update(Number(params.id), req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return controller.delete(Number(params.id));
}
