// public → có thể truy cập ở mọi nơi (bên trong class, bên ngoài class, subclass).

import { number } from "zod";

// private → chỉ có thể truy cập bên trong class hiện tại.

// protected → có thể truy cập trong class hiện tại và các class con (kế thừa), nhưng không thể truy cập trực tiếp từ bên ngoài.

export class BaseRepository<TModel> {
  protected model: any;
  constructor(model: any) {
    this.model = model;
  }
  async findAll(include: object = {}) {
    return this.model.findMany({ include });
  }
  async findById(id: number, include: object = {}) {
    return this.model.findUnique({ where: { id }, include });
  }
  async create(data: TModel) {
    return this.model.creat({ data });
  }
  async update(id: number, data: Partial<TModel>) {
    return this.model.update({ where: { id }, data });
  }
  // Partial<TModel> = cho phép chỉ update một số trường của model
  // tất cả đều optional
  async delete(id: number) {
    return this.model.delete({ where: { id } });
  }
}
