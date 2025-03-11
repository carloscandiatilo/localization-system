import { Module } from '@nestjs/common';
import { AuditRepository } from './repository/audit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entity/audit.entity';
import { AuditService } from './service/audit.service';
import { LogService } from './service/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  providers: [AuditService, AuditRepository, LogService],
  exports: [AuditService, LogService],  
})
export class AuditModule {}
