import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/domain/audit/service/audit.service';
import { Provincia } from '../entity/provincia.entity';
import { ProvinciaRepository } from '../repository/provincia.repository';

@Injectable()
export class ProvinciaService extends BaseService<Provincia> {
  constructor(
    protected readonly provinciaRepository: ProvinciaRepository,
    protected readonly auditService: AuditService,
    protected readonly dataSource: DataSource 
  ) {
    super(provinciaRepository, auditService, dataSource);
  }
}
