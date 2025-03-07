import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from '../entity/role.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource);
  }
}
