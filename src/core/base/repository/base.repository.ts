import { Repository, EntityTarget, DataSource, ObjectLiteral, FindOptionsWhere, DeleteResult } from 'typeorm';


export class BaseRepository<T extends ObjectLiteral & { id: number; nome?: string; isDeleted?: boolean }> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  async findAll(): Promise<T[]> {
    return await this.find({ where: { isDeleted: false } as FindOptionsWhere<T> });
  }

  async findById(id: number): Promise<T | null> {
    return await this.findOneBy({ id, isDeleted: false } as FindOptionsWhere<T>);
  }
  
  async findByCondition(condition: FindOptionsWhere<T>): Promise<T | null> {
    const result = await this.findOne({ where: condition });
    return result || null;
  }

  async createEntity(data: Partial<T>): Promise<T> {
    return await this.save(data as T);
  }

  async updateEntity(id: number, data: Partial<T>): Promise<T | null> {
    await this.update(id, data);
    return await this.findById(id);
  }

  async deleteEntity(id: number): Promise<DeleteResult>{
    return await this.delete(id);
  }
}
