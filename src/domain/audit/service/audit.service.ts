import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../repository/audit.repository';

@Injectable()
export class AuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

  async log(userId: number, action: string, details?: string) {
    return this.auditRepository.createAudit(userId, action, details);
  }
}
