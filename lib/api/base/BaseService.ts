// xử lý business logic chung cho mọi TModel

export class BaseService<TModel> {
  protected repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }
  getAll(includes: object = {}) {
    return this.repository.findAll(includes);
  }
  getById(id: number, include: object = {}) {
    return this.repository.findById(id, include);
  }
  create(data: TModel) {
    return this.repository.create(data);
  }
  update(id: number, data: TModel) {
    return this.repository.update(id, data);
  }
  delete(id: number) {
    return this.repository.delete(id);
  }
}
