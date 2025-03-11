import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/core/auth/user/user.module';
import { RoleService } from './service/role.service';
import { RoleRepository } from './repository/role.repository';
import { Role } from './entity/role.entity';
import { RoleController } from 'src/controller/role.controller';
import { AuditModule } from '../audit/audit.module';

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
