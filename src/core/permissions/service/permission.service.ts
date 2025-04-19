import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/core/audit/service/audit.service';
import { Permission } from '../entity/permission.entity';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    protected readonly dataSource: DataSource,
    protected readonly auditService: AuditService,
  ) {
    super(permissionRepository, auditService, dataSource);
  }
}
