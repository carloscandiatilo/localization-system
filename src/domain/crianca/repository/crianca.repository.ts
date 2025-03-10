import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Crianca } from '../entity/crianca.entity';

@Injectable()
export class CriancaRepository extends BaseRepository<Crianca> {
  constructor(dataSource: DataSource) {
    super(Crianca, dataSource);
  }
}


