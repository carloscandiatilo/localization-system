import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Country } from '../entity/country.entity';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(dataSource: DataSource) {
    super(Country, dataSource);
  }
}
