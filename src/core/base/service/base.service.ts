import { FindOptionsWhere, DataSource, FindOptionsOrder } from 'typeorm';
import { BaseRepository } from '../repository/base.repository';
import { HttpException, HttpStatus, Inject, BadRequestException} from '@nestjs/common';
import { ValidationMessages } from 'src/shared/messages/validation-messages';
import { AuditService } from 'src/core/audit/service/audit.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export class BaseService<T extends { id: number; isDeleted?: boolean }> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    protected readonly auditService: AuditService,
    @Inject(DataSource) protected readonly dataSource: DataSource,
  ) {}

  async getAll( paginador = true, page = 1, limit = 5, orderBy?: { column: keyof T; direction: 'asc' | 'desc' },filtros?: Partial<T>) {
    const where = { isDeleted: false, ...filtros } as FindOptionsWhere<T>;

    const [items, total] = await this.repository.findAndCount({
      where, take: paginador ? limit : undefined, skip: paginador ? (page - 1) * limit : undefined,
      order: orderBy ? ({ [orderBy.column]: orderBy.direction } as FindOptionsOrder<T>): undefined });

    return { data: items, total, page: paginador ? page : undefined, limit: paginador ? limit : undefined };
  }

  async getById(id: number): Promise<T> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new HttpException(
        ValidationMessages.RECORD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return item;
  }

  async create(data: Partial<T>, userId: number): Promise<T> {
    const entity = data as Partial<T & { name: string }>;
  
    if (!entity.name) {
      throw new HttpException(ValidationMessages.FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  
    const existingItem = await this.repository.findByCondition({ name: entity.name, isDeleted: false } as FindOptionsWhere<T>);
    if (existingItem) {
      throw new HttpException(ValidationMessages.DUPLICATE_RECORD, HttpStatus.BAD_REQUEST);
    }
  
    const created = await this.repository.createEntity(data);
  
    await this.auditService.log(userId, 'Criar', `Registro criado: ${JSON.stringify(created)}`);
  
    return created;
  }
  

  async update(id: number, data: Partial<T>, userId: number): Promise<T> {
    const existingItem = await this.getById(id);
    if (!existingItem) { throw new HttpException(ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND); }

    const oldData = JSON.stringify(existingItem);
    const newData = JSON.stringify(data);

    const validarUsuario = {...data, updatedBy: userId};

    const updatedItem = await this.repository.updateEntity(id, validarUsuario);
    if (!updatedItem) {
      throw new HttpException( ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.auditService.log(userId, 'Actualizar', `Antes: ${oldData} | Depois: ${newData}`);

    return updatedItem;
  }

  async softDelete(id: number, userId: number): Promise<string> {
    const entity = await this.getById(id);
  
    if (entity.isDeleted ?? false) {
      throw new HttpException(ValidationMessages.RECORD_SOFT_DELETED, HttpStatus.BAD_REQUEST);
    }
    const updateData: Partial<T> = { isDeleted: true } as Partial<T>;
  
    if ('updatedBy' in entity) {
      (updateData as any).updatedBy = userId;
    }
    await this.repository.updateEntity(id, updateData);
    const nameOuId = 'name' in entity && entity.name ? entity.name : `ID ${id}`;
    await this.auditService.log(userId, 'Excluir', `Registo ${nameOuId} excluído com sucesso!`);
  
    return ValidationMessages.RECORD_SOFT_DELETE_SUCCESS;
  }

  async hardDelete(id: number, userId: number): Promise<string> {
    const entity = await this.getById(id);
    const result = await this.repository.deleteEntity(id);
  
    if (result.affected && result.affected > 0) {
      const nameOuId: string = typeof entity === 'object' && entity && 'name' in entity && typeof entity.name === 'string' ? entity.name : `ID ${id}`;
  
      await this.auditService.log(userId, 'Excluir Permanentemente', `Registo ${nameOuId} excluído permanentemente.`);
  
      return ValidationMessages.RECORD_HARD_DELETE_SUCCESS.replace('{name}', nameOuId);
    }
  
    throw new HttpException(ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async restore(id: number, userId: number): Promise<string> {
    const entity = await this.repository.findOne({ 
      where: { id: id as any, isDeleted: true } as FindOptionsWhere<T> 
    });

    if (!entity) {
      throw new HttpException(ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const updateData: QueryDeepPartialEntity<T> = { ...(entity as any), isDeleted: false };

    if ('updatedBy' in entity) {
      (updateData as any).updatedBy = userId;
    }
    await this.repository.update(id, updateData);

    const nameOuId: string = typeof entity === 'object' && entity && 'name' in entity && typeof entity.name === 'string'? entity.name: `ID ${id}`;

    await this.auditService.log(userId, 'Recuperar', `Registo ${nameOuId} restaurado.`);

    return ValidationMessages.RECORD_RESTORE_SUCCESS;
  }

  async findAndCount(filter: any) {
    return this.repository.findAndCount(filter);
  }
}
