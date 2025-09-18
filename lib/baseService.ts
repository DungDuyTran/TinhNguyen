export class BaseService<TRepo, TSchema> {
  public repository: TRepo;
  protected schema: TSchema;

  constructor(repository: TRepo, schema: TSchema) {
    this.repository = repository;
    this.schema = schema;
  }
}
