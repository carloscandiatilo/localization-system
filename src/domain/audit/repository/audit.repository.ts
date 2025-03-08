import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Audit } from '../entity/audit.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';

@Injectable()
export class AuditRepository extends BaseRepository<Audit> {
  constructor(dataSource: DataSource) {
    super(Audit, dataSource);
  }

  async createAudit(userId: number, action: string, details?: string) {
    const audit = this.create({ userId, action, details });
    return this.save(audit);
  }
}
