import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findByCondition({ email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findByCondition({ username });
  }
  
}


