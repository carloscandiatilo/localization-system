// import { FindOptionsWhere, DataSource, FindOptionsOrder } from 'typeorm';
// import { BaseRepository } from '../repository/base.repository';
// import { HttpException, HttpStatus, Inject, BadRequestException } from '@nestjs/common';

// export class BaseService<T extends { id: number; isDeleted?: boolean }> {
//   constructor(
//     protected readonly repository: BaseRepository<T>,
//     @Inject(DataSource) protected readonly dataSource: DataSource
//   ) {}

//   async getAll(
//     paginador = true,
//     page = 1,
//     limit = 5,
//     orderBy?: { column: keyof T; direction: 'asc' | 'desc' },
//     filtros?: Partial<T>
//   ) {
//     const where = { isDeleted: false, ...filtros } as FindOptionsWhere<T>;
    
//     const [items, total] = await this.repository.findAndCount({
//       where,
//       take: paginador ? limit : undefined,
//       skip: paginador ? (page - 1) * limit : undefined,
//       order: orderBy ? { [orderBy.column]: orderBy.direction } as FindOptionsOrder<T> : undefined
//     });
  
//     return {
//       data: items,
//       total,
//       page: paginador ? page : undefined,
//       limit: paginador ? limit : undefined,
//     };
//   }
  
  
  

//   async getById(id: number): Promise<T> {
//     const item = await this.repository.findById(id);
//     if (!item) {
//       const nome = item?.['nome'] ? `'${item['nome']}'` : `ID ${id}`;
//       throw new HttpException(`Registro com ${nome} não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//     return item;
//   }

//   async create(data: Partial<T>, uniqueCondition?: FindOptionsWhere<T>): Promise<T> {
//     if (uniqueCondition) {
//       const existingItem = await this.repository.findByCondition(uniqueCondition);
//       if (existingItem) {
//         throw new HttpException('Registro duplicado encontrado.', HttpStatus.BAD_REQUEST);
//       }
//     }
//     await this.validarIdsReferenciados(data);
//     return this.repository.createEntity(data);
//   }

//   async update(id: number, data: Partial<T>): Promise<T> {
//     await this.validarIdsReferenciados(data);
//     const updatedItem = await this.repository.updateEntity(id, data);
//     if (!updatedItem) {
//       const item = await this.getById(id).catch(() => null);
//       const nome = item?.['nome'] ? `'${item['nome']}'` : `ID ${id}`;
//       throw new HttpException(`Registro com ${nome} não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//     return updatedItem;
//   }

//   async softDelete(id: number): Promise<string> {
//     const entity = await this.getById(id);
//     if (entity.isDeleted ?? false) {
//       throw new HttpException(`O valor com id ${id} já está marcado como excluído.`, HttpStatus.BAD_REQUEST);
//     }
//     await this.repository.updateEntity(id, { isDeleted: true } as Partial<T>);
//     const nome = entity?.['nome'] ? `'${entity['nome']}'` : `ID ${id}`;
//     return `Registro ${nome} foi excluído com sucesso!`;
//   }

//   async hardDelete(id: number): Promise<string> {
//     const entity = await this.getById(id);
//     const result = await this.repository.deleteEntity(id);
//     if (result.affected && result.affected > 0) {
//       const nome = entity?.['nome'] ? `'${entity['nome']}'` : `ID ${id}`;
//       return `Registro ${nome} foi excluído definitivamente.`;
//     }
//     throw new HttpException(`Registro com id ${id} não encontrado para exclusão definitiva.`, HttpStatus.NOT_FOUND);
//   }

//   async restore(id: number): Promise<string> {
//     const entity = await this.repository.findOne({ where: { id: id as any, isDeleted: true } as FindOptionsWhere<T> });
//     if (!entity) {
//         throw new HttpException(`Registro com ID ${id} não encontrado para restauração.`, HttpStatus.NOT_FOUND);
//     }
//     await this.repository.update(id, { isDeleted: false } as any);

//     const nome = entity['nome'] ? `'${entity['nome']}'` : `ID ${id}`;
//     return `Registro ${nome} foi restaurado com sucesso.`;
// }



//   private async validarIdsReferenciados(data: Partial<T>): Promise<void> {
//     const entidadeAtual = this.dataSource.getMetadata(this.repository.target);
//     const camposValidos = entidadeAtual.columns.map(coluna => coluna.propertyName);

//     for (const [campo, valor] of Object.entries(data)) {
//       if (!camposValidos.includes(campo)) {
//         throw new BadRequestException(`O campo '${campo}' não existe na entidade '${entidadeAtual.name}'.`);
//       }
//       if (campo.endsWith('Id') && valor) {
//         const entidadeNome = campo.replace('Id', '');
//         const id = valor as number;
//         const entidadeReferenciada = this.dataSource.entityMetadatas.find(meta =>
//           meta.name.toLowerCase() === entidadeNome.toLowerCase() ||
//           meta.tableName.toLowerCase() === entidadeNome.toLowerCase()
//         );
//         if (!entidadeReferenciada) {
//           throw new BadRequestException(`O valor inserido na coluna '${entidadeNome}' não existe!`);
//         }
//         const repository = this.dataSource.getRepository(entidadeReferenciada.target);
//         const existe = await repository.findOne({ where: { id, isDeleted: false } });
//         if (!existe) {
//           throw new BadRequestException(`O ${entidadeNome} com id ${id} não existe.`);
//         }
//       }
//     }
//   }
// }