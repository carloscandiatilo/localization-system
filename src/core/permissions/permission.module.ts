import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from '../audit/audit.module';
import { Permission } from './entity/permission.entity';
import { PermissionService } from './service/permission.service';
import { PermissionRepository } from './repository/permission.repository';
import { PermissionController } from 'src/controller/core-controller/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AuditModule],
  providers: [PermissionService, PermissionRepository],
  controllers: [PermissionController],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
