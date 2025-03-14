import { DataSource } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

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

  async findUserWithRole(userId: number): Promise<User | null> {
    try {
      const user = await this.findOne({
        where: { id: userId },
        relations: ['role'], 
      });

      if (!user) {
        throw new HttpException(ValidationMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || ValidationMessages.USER_FETCH_ERROR,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findUsersByRole(roleId: number): Promise<User[]> {
    return this.find({
      where: { role: { id: roleId } },
      relations: ['role'],
    });
  }
}
