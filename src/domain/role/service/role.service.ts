import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { UserRepository } from 'src/core/auth/user/repository/user.repository';
import { Role } from '../entity/role.entity';
import { BaseService } from 'src/core/base/service/base.service';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(roleRepository); // Passa o RoleRepository para o BaseService
  }

  // Método específico para atribuir uma role a um usuário
  async assignRoleToUser(userId: number, roleId: number): Promise<string> {
    // Verificar se o usuário existe
    const user = await this.userRepository.findById(userId);
    if (!user) {  // Corrigido: Verifica se user é null
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar se a role existe
    const role = await this.getById(roleId);



    if (typeof role === 'string') {  // Mantido: verifica se role não foi encontrada
      throw new HttpException('Role não encontrada', HttpStatus.NOT_FOUND);
    }

    // Atribuir a role ao usuário (supondo que a entidade User tem um campo role)
    user.role = role;
    await this.userRepository.save(user);

    return `Role ${role.nome} atribuída ao usuário ${user.username}`;
  }

  // Exemplo de método específico que não é padrão do CRUD
  async createRole(nome: string, descricao: string): Promise<Role | string> {
    return this.create({ nome, descricao }, { nome });
  }
}
