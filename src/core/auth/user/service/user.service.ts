import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { RoleService } from 'src/domain/role/service/role.service';
import { validate } from 'class-validator';
import { ValidationMessages } from 'src/shared/messages/validation-messages';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(userData: { name: string; username: string; password: string; email: string; roleId?: number | null }): Promise<User> {
    const { name, username, password, email, roleId } = userData;

    const existingUserByEmail = await this.findByEmail(email);
    if (existingUserByEmail) {
      throw new HttpException(ValidationMessages.EMAIL_IN_USE, HttpStatus.BAD_REQUEST);
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        name,
        username,
        password: hashedPassword,
        email,
        role: roleId ? await this.roleService.getById(roleId) : null,
      });

      const errors = await validate(user);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join('; ');
        throw new HttpException(`${ValidationMessages.VALIDATION_ERROR} ${errorMessages}`, HttpStatus.BAD_REQUEST);
      }

      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(ValidationMessages.PASSWORD_HASH_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
