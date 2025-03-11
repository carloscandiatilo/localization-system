import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuditService } from 'src/domain/audit/service/audit.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService, 
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async generateToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id, roleId: user.roleId };
    await this.auditService.log(user.id, 'login', `Usuário ${user.username} logou com sucesso!`);
    return this.jwtService.sign(payload);
  }
}
