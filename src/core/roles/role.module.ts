import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './service/role.service';
import { RoleRepository } from './repository/role.repository';
import { Role } from './entity/role.entity';
import { AuditModule } from '../audit/audit.module';
import { RoleController } from 'src/controller/core-controller/role.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UserModule),AuditModule
  ],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
