import { IsOptional, IsNumber, IsBoolean, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}

export class CreateDto extends BaseDto {
  @IsString()
  nome: string;
}
