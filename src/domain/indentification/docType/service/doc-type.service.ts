import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/core/audit/service/audit.service';
import { DocType } from '../entity/doc-type.entity';
import { DocTypeRepository } from '../repository/doc-type.repository';

@Injectable()
export class DocTypeService extends BaseService<DocType> {
  constructor(
    private readonly docTypeRepository: DocTypeRepository,
    protected readonly auditService: AuditService,
    protected readonly dataSource: DataSource,
  ) {
    super(docTypeRepository, auditService, dataSource);
  }
}
