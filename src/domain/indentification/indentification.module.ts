import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from 'src/core/audit/audit.module';
import { DocTypeService } from './docType/service/doc-type.service';
import { DocTypeRepository } from './docType/repository/doc-type.repository';
import { DocType } from './docType/entity/doc-type.entity';
import { DocTypeController } from 'src/controller/domain-controller/identification-controller/doc-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocType]), AuditModule],
  providers: [DocTypeService, DocTypeRepository],
  controllers: [DocTypeController],
  exports: [DocTypeService, DocTypeRepository],
})
export class IdentificationModule {}



