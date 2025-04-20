import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/core/audit/service/audit.service';
import { Province } from '../entity/province.entity';
import { ProvinceRepository } from '../repository/province.repository';

@Injectable()
export class ProvinceService extends BaseService<Province> {
  constructor(
    private readonly provinceRepository: ProvinceRepository,
    protected readonly auditService: AuditService,
    protected readonly dataSource: DataSource,
  ) {
    super(provinceRepository, auditService, dataSource);
  }
}
