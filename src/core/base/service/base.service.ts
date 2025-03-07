import { FindOptionsWhere } from 'typeorm';
import { BaseRepository } from '../repository/base.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseService<T extends { id: number; isDeleted?: boolean }> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async getAll(): Promise<T[]> {
    const items = await this.repository.findAll();
    if (items.length === 0) {
      throw new HttpException('Nenhum registro encontrado.', HttpStatus.NOT_FOUND);
    }
    return items;
  }

  async getById(id: number): Promise<T> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new HttpException(`Registro com ID ${id} não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async create(data: Partial<T>, uniqueCondition?: FindOptionsWhere<T>): Promise<T> {
    if (uniqueCondition) {
      const existingItem = await this.repository.findByCondition(uniqueCondition);
      if (existingItem) {
        throw new HttpException('Registro duplicado encontrado.', HttpStatus.BAD_REQUEST);
      }
    }
    return this.repository.createEntity(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const updatedItem = await this.repository.updateEntity(id, data);
    if (!updatedItem) {
      throw new HttpException(`Registro com ID ${id} não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return updatedItem;
  }

  async softDelete(id: number): Promise<string> {
    const entity = await this.getById(id);

    if (entity.isDeleted) {
      throw new HttpException(`Entidade com ID ${id} já está marcada como deletada.`, HttpStatus.BAD_REQUEST);
    }

    await this.repository.updateEntity(id, { ...entity, isDeleted: true });
    return `Entidade com ID ${id} deletada logicamente.`;
  }

  async hardDelete(id: number): Promise<string> {
    const result = await this.repository.deleteEntity(id);
    if (result.affected && result.affected > 0) {
      return `Entidade com ID ${id} deletada fisicamente.`;
    }
    throw new HttpException(`Entidade com ID ${id} não encontrada para exclusão física.`, HttpStatus.NOT_FOUND);
  }
}
