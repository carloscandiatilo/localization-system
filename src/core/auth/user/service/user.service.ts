import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { RoleService } from 'src/domain/role/service/role.service';
import { validate } from 'class-validator';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

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
      throw new HttpException('E-mail já está em uso', HttpStatus.BAD_REQUEST);
    }

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
      throw new HttpException(`Erro de validação: ${errorMessages}`, HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.save(user);
}

  async updateUser(id: number, body: { username?: string; email?: string; password?: string; roleId?: number }): Promise<User> {
    const user = await this.userRepository.findUserWithRole(id);
    if (!user) {
      throw new HttpException(ValidationMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (body.username) user.username = body.username;
    if (body.email) user.email = body.email;

    if (body.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(body.password, salt);
    }

    if (body.roleId) {
      const role = await this.roleService.getById(body.roleId);
      if (!role) {
        throw new HttpException(ValidationMessages.ROLE_INVALID, HttpStatus.BAD_REQUEST);
      }
      user.role = role;
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join('; ');
      throw new HttpException(`${ValidationMessages.VALIDATION_ERROR} ${errorMessages}`, HttpStatus.BAD_REQUEST);
    }

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
