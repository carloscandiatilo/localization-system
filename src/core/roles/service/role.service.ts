import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { Role } from '../entity/role.entity';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { ValidationMessages } from 'src/shared/messages/validation-messages';
import { AuditService } from 'src/core/audit/service/audit.service';
import { UserRepository } from 'src/core/user/repository/user.repository';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
    protected readonly dataSource: DataSource,
    protected readonly auditService: AuditService,
  ) {
    super(roleRepository, auditService, dataSource);
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<string> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException(ValidationMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const role = await this.getById(roleId);

    if (typeof role === 'string') {
      throw new HttpException(ValidationMessages.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    user.role = role;
    await this.userRepository.save(user);

    return ValidationMessages.ROLE_ASSIGNED.replace('{role}', role.name).replace('{user}', user.username);
  }
}
