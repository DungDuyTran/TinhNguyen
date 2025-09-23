import { UserController } from "@/lib/api/controllers/UserController";

const Controller = new UserController();

export async function GET() {
  return Controller.getAll();
}

export async function POST(req: Request) {
  const data = await req.json();
  return Controller.create(data);
}
