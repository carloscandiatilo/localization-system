import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Province } from '../entity/province.entity';

@Injectable()
export class ProvinceRepository extends BaseRepository<Province> {
  constructor(dataSource: DataSource) {
    super(Province, dataSource);
  }
}
