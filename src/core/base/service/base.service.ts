import { FindOptionsWhere, EntityTarget, DataSource } from 'typeorm';
import { BaseRepository } from '../repository/base.repository';
import { HttpException, HttpStatus, Inject, BadRequestException } from '@nestjs/common';

export class BaseService<T extends { id: number; isDeleted?: boolean }> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    @Inject(DataSource) protected readonly dataSource: DataSource
  ) {}

  async getAll(paginador = true, page = 1, limit = 5): Promise<{ data: T[]; total: number; page?: number; limit?: number }> {
    if (paginador) {
      const [items, total] = await this.repository.findAndCount({
        where: { isDeleted: false } as FindOptionsWhere<T>,
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        data: items,
        total,
        page,
        limit,
      };
    } else {
      const items = await this.repository.find({
        where: { isDeleted: false } as FindOptionsWhere<T>,
      });

      return {
        data: items,
        total: items.length,
      };
    }
  }

  async getById(id: number): Promise<T> {
    const item = await this.repository.findById(id);
    if (!item) {
      const nome = (item as any)?.nome ? `'${(item as any).nome}'` : `ID ${id}`;
      throw new HttpException(`Registro com ${nome} não encontrado.`, HttpStatus.NOT_FOUND);
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

    await this.validarIdsReferenciados(data);
    return this.repository.createEntity(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.validarIdsReferenciados(data); 
    const updatedItem = await this.repository.updateEntity(id, data);
    if (!updatedItem) {
      const item = await this.getById(id).catch(() => null);
      const nome = (item as any)?.nome ? `'${(item as any).nome}'` : `ID ${id}`;
      throw new HttpException(`Registro com ${nome} não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return updatedItem;
  }
  

  async softDelete(id: number): Promise<string> {
    const entity = await this.getById(id);

    if (entity.isDeleted) {
      throw new HttpException(`O valor com id ${id} já está marcada como exluido.`, HttpStatus.BAD_REQUEST);
    }

    await this.repository.updateEntity(id, { ...entity, isDeleted: true });
    const nome = (entity as any).nome ? `'${(entity as any).nome}'` : `ID ${id}`;
    return `Registo ${nome} foi excluído provisoriamente.`;
  }

  async hardDelete(id: number): Promise<string> {
    const entity = await this.getById(id);
    const result = await this.repository.deleteEntity(id);
  
    if (result.affected && result.affected > 0) {
      const nome = (entity as any).nome ? `'${(entity as any).nome}'` : `ID ${id}`;
      return `Registo ${nome} foi excluído definitivamente.`;
    }
  
    throw new HttpException(`Registo com id ${id} não encontrada para exclusão definitiva.`, HttpStatus.NOT_FOUND);
  }

  private async validarIdsReferenciados(data: Partial<T>): Promise<void> {
    const entidadeAtual = this.dataSource.getMetadata(this.repository.target);
    const camposValidos = entidadeAtual.columns.map(coluna => coluna.propertyName);
  
    for (const [campo, valor] of Object.entries(data)) {
      if (!camposValidos.includes(campo)) {
        throw new BadRequestException(`O campo '${campo}' não existe na entidade '${entidadeAtual.name}'.`);
      }
  
      if (campo.endsWith('Id') && valor) {
        const entidadeNome = campo.replace('Id', '');
        const id = valor as number;
  
        const entidadeReferenciada = this.dataSource.entityMetadatas.find(meta =>
          meta.name.toLowerCase() === entidadeNome.toLowerCase() ||
          meta.tableName.toLowerCase() === entidadeNome.toLowerCase()
        );
  
        if (!entidadeReferenciada) {
          throw new BadRequestException(`o valor inserido na coluna '${entidadeNome}' não existe!`);
        }
  
        const repository = this.dataSource.getRepository(entidadeReferenciada.target);
        const existe = await repository.findOne({ where: { id, isDeleted: false } });
  
        if (!existe) {
          throw new BadRequestException(`O ${entidadeNome} com id ${id} não existe.`);
        }
      }
    }
  }
}
