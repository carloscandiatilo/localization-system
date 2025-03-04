import { FindOptionsWhere } from 'typeorm';
import { BaseRepository } from '../repository/base.repository';

export class BaseService<T extends { id: number; isDeleted?: boolean }> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async getAll(): Promise<T[] | string> {
    const items = await this.repository.findAll();
    if (items.length === 0) {
      return 'Nenhum registro encontrado.';
    }
    return items;
  }

  async getById(id: number): Promise<T | string> {
    const item = await this.repository.findById(id);
    if (!item) {
      return `Registro com ID ${id} não encontrado.`;
    }
    return item;
  }

  async create(data: Partial<T>, uniqueCondition?: FindOptionsWhere<T>): Promise<T | string> {
    if (uniqueCondition) {
      const existingItem = await this.repository.findByCondition(uniqueCondition);
      if (existingItem) {
        return 'Registro duplicado encontrado.';
      }
    }
    return this.repository.createEntity(data);
  }

  async update(id: number, data: Partial<T>): Promise<T | string> {
    const updatedItem = await this.repository.updateEntity(id, data);
    if (!updatedItem) {
      return `Registro com ID ${id} não encontrado.`;
    }
    return updatedItem;
  }

  async softDelete(id: number): Promise<string> {
    const entity = await this.getById(id);
    if (typeof entity === 'string') {
      return entity;
    }
  
    if (entity.isDeleted) {
      return `Entidade com ID ${id} já está marcada como deletada.`;
    }
  
    await this.repository.updateEntity(id, { ...entity, isDeleted: true });
    return `Entidade com ID ${id} deletada logicamente.`;
  }

  async hardDelete(id: number): Promise<string> {
    const result = await this.repository.deleteEntity(id);
    if(result.affected && result.affected > 0){
      return `Entidade com ID ${id} deletada fisicamente.`;
    }
    return `Entidade com ID ${id} não encontrada para exclusão física.`;
  }
}