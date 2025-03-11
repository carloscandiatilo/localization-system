import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'carlos123' })
  username: string;

  @ApiProperty({ example: 'senha123' })
  password: string;
}
