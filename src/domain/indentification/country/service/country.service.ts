import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/core/audit/service/audit.service';
import { Country } from '../entity/country.entity';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class CountryService extends BaseService<Country> {
  constructor(
    private readonly countryRepository: CountryRepository,
    protected readonly auditService: AuditService,
    protected readonly dataSource: DataSource,
  ) {
    super(countryRepository, auditService, dataSource);
  }
}
