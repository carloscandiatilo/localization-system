import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from '../entity/audit.entity';
import { LogService } from './log.service';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
    private readonly logService: LogService
  ) {}

  async log(userId: number, accao: string, detalhes: string) {
    if (!userId) {
      throw new Error('Obrigatório passar o usuário para o log identificar!');
    }

    const auditEntry = this.auditRepository.create({
      userId,
      accao,
      detalhes,
    });
    await this.auditRepository.save(auditEntry);
    // Grava no TXT
    const logMessage = `Usuário ${userId} realizou a ação: ${accao}. Detalhes: ${detalhes}`;
    this.logService.writeLog(logMessage);
  }
}
