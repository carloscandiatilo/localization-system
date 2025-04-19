import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { PermissionService } from 'src/core/permissions/service/permission.service';
import { Permission } from 'src/core/permissions/entity/permission.entity';

@Controller('permissions')
export class PermissionController extends BaseController<Permission> {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService); 
  }
}
