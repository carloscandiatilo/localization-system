import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Provincia } from '../entity/provincia.entity';

@Injectable()
export class ProvinciaRepository extends BaseRepository<Provincia> {
  constructor(dataSource: DataSource) {
    super(Provincia, dataSource);
  }
}


