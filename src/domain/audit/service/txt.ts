// import { FindOptionsWhere, DataSource, FindOptionsOrder } from 'typeorm';
// import { BaseRepository } from '../repository/base.repository';
// import { HttpException, HttpStatus, Inject, BadRequestException} from '@nestjs/common';
// import { ValidationMessages } from 'src/shared/messages/validation-messages';
// import { AuditService } from 'src/domain/audit/service/audit.service';
// export class BaseService<T extends { id: number; isDeleted?: boolean }> {
//   constructor(
//     protected readonly repository: BaseRepository<T>,
//     protected readonly auditService: AuditService,
//     @Inject(DataSource) protected readonly dataSource: DataSource,
//   ) {}

//   async getAll( paginador = true, page = 1, limit = 5, orderBy?: { column: keyof T; direction: 'asc' | 'desc' },filtros?: Partial<T>) {
//     const where = { isDeleted: false, ...filtros } as FindOptionsWhere<T>;

//     const [items, total] = await this.repository.findAndCount({
//       where, take: paginador ? limit : undefined, skip: paginador ? (page - 1) * limit : undefined,
//       order: orderBy ? ({ [orderBy.column]: orderBy.direction } as FindOptionsOrder<T>): undefined });

//     return { data: items, total, page: paginador ? page : undefined, limit: paginador ? limit : undefined };
//   }

//   async getById(id: number): Promise<T> {
//     const item = await this.repository.findById(id);
//     if (!item) {
//       throw new HttpException(
//         ValidationMessages.RECORD_NOT_FOUND,
//         HttpStatus.NOT_FOUND,
//       );
//     }
//     return item;
//   }

//   async create(data: Partial<T>, userId: number): Promise<T> {
//     const entity = data as Partial<T & { nome: string }>;

//     if (!entity.nome) {
//       throw new HttpException('O campo nome é obrigatório.', HttpStatus.BAD_REQUEST);
//     }

//     const existingItem = await this.repository.findByCondition({ nome: entity.nome, isDeleted: false } as FindOptionsWhere<T>);
//     if (existingItem) {
//       throw new HttpException('Já existe um Registo com esse nome.', HttpStatus.BAD_REQUEST);
//     }

//     const created = await this.repository.createEntity(data);
//     return created;
//   }

//   async update(id: number, data: Partial<T>, userId: number): Promise<T> {
//     const existingItem = await this.getById(id);
//     if (!existingItem) { throw new HttpException(ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND); }

//     const oldData = JSON.stringify(existingItem);
//     const newData = JSON.stringify(data);

//     const validarUsuario = {...data, updatedBy: userId};

//     const updatedItem = await this.repository.updateEntity(id, validarUsuario);
//     if (!updatedItem) {
//       throw new HttpException( ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
//     }

//     await this.auditService.log(userId, 'Actualizar', `Antes: ${oldData} | Depois: ${newData}`);

//     return updatedItem;
//   }

//   async softDelete(id: number, userId: number): Promise<string> {
//     const entity = await this.getById(id);
//     if (entity.isDeleted ?? false) {
//       throw new HttpException( ValidationMessages.RECORD_SOFT_DELETED, HttpStatus.BAD_REQUEST );
//     }

//     await this.repository.updateEntity(id, {isDeleted: true, updatedBy: userId } as unknown as Partial<T>);

//     await this.auditService.log( userId,'Excluir',`Registo ID ${id} excluído com sucesso!` );

//     return ValidationMessages.RECORD_SOFT_DELETE_SUCCESS;
//   }

//   async hardDelete(id: number, userId: number): Promise<string> {
//     const entity = await this.getById(id);
//     const result = await this.repository.deleteEntity(id);

//     if (result.affected && result.affected > 0) {
//       await this.auditService.log( userId, 'Excluir Permanentemente', `Registo ID ${id} excluído permanentemente.`);
//       return ValidationMessages.RECORD_HARD_DELETE_SUCCESS.replace('{nome}',`ID ${id}`);
//     }

//     throw new HttpException( ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
//   }

//   async restore(id: number, userId: number): Promise<string> {
//     const entity = await this.repository.findOne({ where: { id: id as any, isDeleted: true } as FindOptionsWhere<T> });
//     if (!entity) {
//       throw new HttpException( ValidationMessages.RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
//     }

//     await this.repository.update(id, { isDeleted: false, updatedBy: userId} as any);

//     await this.auditService.log(userId, 'Recuperar',`Registo ID ${id} restaurado.`);

//     return ValidationMessages.RECORD_RESTORE_SUCCESS;
//   }

//   private async validarIdsReferenciados(data: Partial<T>): Promise<void> {
//     const entidadeAtual = this.dataSource.getMetadata(this.repository.target);
//     const camposValidos = entidadeAtual.columns.map(
//       (coluna) => coluna.propertyName,
//     );

//     for (const [campo, valor] of Object.entries(data)) {
//       if (!camposValidos.includes(campo)) {
//         throw new BadRequestException(ValidationMessages.FIELD_NOT_FOUND.replace('{campo}', campo).replace('{entidade}', entidadeAtual.name));
//       }
//       if (campo.endsWith('Id') && valor) {
//         const entidadeNome = campo.replace('Id', '');
//         const id = valor as number;
//         const entidadeReferenciada = this.dataSource.entityMetadatas.find(
//           (meta) =>
//             meta.name.toLowerCase() === entidadeNome.toLowerCase() ||
//             meta.tableName.toLowerCase() === entidadeNome.toLowerCase(),
//         );
//         if (!entidadeReferenciada) {
//           throw new BadRequestException(ValidationMessages.INVALID_FOREIGN_KEY.replace('{entidadeNome}', entidadeNome));
//         }
//         const repository = this.dataSource.getRepository(
//           entidadeReferenciada.target,
//         );
//         const existe = await repository.findOne({
//           where: { id, isDeleted: false },
//         });
//         if (!existe) {
//           throw new BadRequestException(ValidationMessages.FOREIGN_KEY_NOT_FOUND.replace('{entidadeNome}', entidadeNome).replace('{id}', id.toString()));
//         }
//       }
//     }
//   }
// }
