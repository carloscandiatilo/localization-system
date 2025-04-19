import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { BaseDto } from 'src/core/base/dto/base.dto';

export class UpdateModuleDto extends BaseDto {
  @IsString()
  @IsOptional()
  name?: string;

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
