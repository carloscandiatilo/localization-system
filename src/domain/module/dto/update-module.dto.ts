import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { BaseDto } from 'src/core/base/dto/base.dto';

export class UpdateModuleDto extends BaseDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsBoolean()
  @IsOptional()
  isModulo?: boolean;

  @IsNumber()
  @IsOptional()
  paiId?: number;
}
