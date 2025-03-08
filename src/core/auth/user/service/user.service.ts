import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { RoleService } from 'src/domain/role/service/role.service'; 

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(username: string, password: string, email: string, roleId: number): Promise<User> {
    // Verificar se o e-mail já existe
    const existingUserByEmail = await this.findByEmail(email);
    if (existingUserByEmail) {
      throw new HttpException('E-mail já está em uso', HttpStatus.BAD_REQUEST);
    }

    // Validar se o roleId foi passado corretamente
    if (!roleId) {
      throw new HttpException('RoleId é obrigatório', HttpStatus.BAD_REQUEST);
    }

    // Verificar se a role existe
    const role = await this.roleService.getById(roleId);
    if (!role) {
      throw new HttpException('Role inválida', HttpStatus.BAD_REQUEST);
    }

    // Hash da senha
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar usuário
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

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
