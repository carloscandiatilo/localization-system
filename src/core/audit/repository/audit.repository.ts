import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Audit } from '../entity/audit.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';

@Injectable()
export class AuditRepository extends BaseRepository<Audit> {
  constructor(dataSource: DataSource) {
    super(Audit, dataSource);
  }

  async createAudit(userId: number, accao: string, detalhes?: string) {
    const audit = this.create({ userId, accao, detalhes });
    return this.save(audit);
  }
}
