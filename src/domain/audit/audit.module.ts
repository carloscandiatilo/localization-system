import { Module } from '@nestjs/common';
import { AuditRepository } from './repository/audit.repository';  // Se tiver um repositório específico
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entity/audit.entity';  // Entidade Audit
import { AuditService } from './service/audit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],  // Importa a entidade Audit
  providers: [AuditService, AuditRepository],    // Declara o service e o repository
  exports: [AuditService],                       // 🔄 Exporta o AuditService para outros módulos
})
export class AuditModule {}
