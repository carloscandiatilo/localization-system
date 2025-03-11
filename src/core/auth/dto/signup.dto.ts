import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'Carlos' })
  name: string;

  @ApiProperty({ example: 'carlos123' })
  username: string;

  @ApiProperty({ example: 'senha123' })
  password: string;

  @ApiProperty({ example: 'carlos@gmail.com' })
  email: string;
}
