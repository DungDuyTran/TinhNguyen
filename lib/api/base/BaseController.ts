import { NextRequest, NextResponse } from "next/server";

export class BaseController<TModel> {
  protected service: any;

  constructor(service: any) {
    this.service = service;
  }

  getAll = async () => {
    const result = await this.service.getAll();
    return NextResponse.json(result);
  };

  getById = async (id: number) => {
    const result = await this.service.getById(id);
    return NextResponse.json(result);
  };

  create = async (data: TModel) => {
    const result = await this.service.create(data);
    return NextResponse.json(result);
  };

  update = async (id: number, req: NextRequest) => {
    const data = await req.json();
    const result = await this.service.update(id, data);
    return NextResponse.json(result);
  };

  delete = async (id: number) => {
    const result = await this.service.delete(id);
    return NextResponse.json(result);
  };
}
