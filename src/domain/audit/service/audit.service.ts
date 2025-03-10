import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../repository/audit.repository';
import { Audit } from '../entity/audit.entity';

@Injectable()
export class AuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

  // async log(userId: number, action: string, details?: string) {
  //   if (!userId) {
  //     throw new Error('User ID is required for audit logs');
  //   }

  //   const audit = new Audit();
  //   audit.userId = userId;       // ✅ Definindo o userId corretamente
  //   audit.action = action;
  //   audit.details = details || null;

  //   return this.auditRepository.save(audit);  // ✅ Salvando com o userId
  // }

  async log(userId: number, action: string, details: string) {
    if (!userId) {
      throw new Error('User ID is required for audit logs');
    }
    
    await this.auditRepository.save({
      userId,
      action,
      details,
      timestamp: new Date(),
    });
  }
  
}
