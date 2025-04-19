import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { BaseDto } from 'src/core/base/dto/base.dto';

export class CreateModuleDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isModule?: boolean;

  @IsNumber()
  @IsOptional()
  aggregateModule?: number;
}
