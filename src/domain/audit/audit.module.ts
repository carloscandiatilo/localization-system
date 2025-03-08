import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entity/audit.entity';
import { AuditRepository } from './repository/audit.repository';
import { AuditService } from './service/audit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  providers: [AuditService, AuditRepository],
  exports: [AuditService],
})
export class AuditModule {}
