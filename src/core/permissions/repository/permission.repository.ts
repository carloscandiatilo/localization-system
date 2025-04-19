import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Permission } from '../entity/permission.entity';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(dataSource: DataSource) {
    super(Permission, dataSource);
  }
}
