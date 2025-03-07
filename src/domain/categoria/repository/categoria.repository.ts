import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Categoria } from '../entity/categoria.entity';

@Injectable()
export class CategoriaRepository extends BaseRepository<Categoria> {
  constructor(dataSource: DataSource) {
    super(Categoria, dataSource);
  }

  async findByName(nome: string): Promise<Categoria | null> {
    return this.findByCondition({ nome });
  }

}


