import { Controller } from '@nestjs/common';
import { Role } from 'src/core/roles/entity/role.entity';
import { RoleService } from 'src/core/roles/service/role.service';
import { BaseController } from './base.controller';

@Controller('roles')
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService); 
  }
}
