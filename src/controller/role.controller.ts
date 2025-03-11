import { Controller, Post, Param } from '@nestjs/common';
import { Role } from 'src/domain/role/entity/role.entity';
import { RoleService } from 'src/domain/role/service/role.service';
import { BaseController } from './base.controller';

@Controller('roles')
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService); 
  }


  @Post(':roleId/users/:userId')
  async assignRoleToUser(@Param('roleId') roleId: number, @Param('userId') userId: number) {
    return this.roleService.assignRoleToUser(userId, roleId);
  }
}
