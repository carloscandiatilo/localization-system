import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignupDto } from './signup.dto';

export class UpdateUserDto extends PartialType(SignupDto) {
  @ApiProperty({ example: 'novoemail@gmail.com', required: false })
  email?: string;

  @ApiProperty({ example: 'novaSenha123', required: false })
  password?: string;

  @ApiProperty({ example: 2, required: false, description: 'ID do novo perfil (roleId)' })
  roleId?: number;
}
