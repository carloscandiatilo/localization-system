import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleEntity } from './entity/module.entity';
import { ModuleService } from './service/module.service';
import { ModuleRepository } from './repository/module.repository';
import { AuditModule } from '../audit/audit.module';
import { ModuleController } from 'src/controller/core-controller/module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity]), AuditModule],
  providers: [ModuleService, ModuleRepository],
  controllers: [ModuleController],
  exports: [ModuleService, ModuleRepository],
})
export class ModuleModule {}
