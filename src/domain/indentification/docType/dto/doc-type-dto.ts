import { IsString, IsNotEmpty, IsEnum, MaxLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core/base/dto/base.dto';
import { ValidateDocMask } from 'src/shared/validator/doc-mask.validator';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

export enum DocTypeEnum {
  BilheteDeIdentidade = 'Bilhete de Identidade',
  Passaporte = 'Passaporte',
  Outro = 'Outro',
}

export class DocTypeDto extends BaseDto {
  @ApiProperty({
    enum: DocTypeEnum,
    description: 'Tipo de documento (Bilhete de Identidade, Passaporte ou Outro)',
    example: DocTypeEnum.BilheteDeIdentidade,
  })
  @IsEnum(DocTypeEnum, {
    message: ValidationMessages.DOCUMENT.INVALID_TYPE,
  })
  @IsNotEmpty({ message: ValidationMessages.DOCUMENT.TYPE_REQUIRED })
  name: DocTypeEnum;

  @ApiProperty({
    description: 'Máscara de preenchimento do documento',
    examples: {
      'Bilhete de Identidade': { value: '123456789LA123' },
      'Passaporte': { value: 'N1234567' },
      'Outro': { value: 'QUALQUERCOISA' }
    }
  })
  @IsNotEmpty({ message: ValidationMessages.DOCUMENT.MASK_REQUIRED })
  @IsString({ message: ValidationMessages.DOCUMENT.MASK_INVALID_STRING })
  @Validate(ValidateDocMask)
  mask: string;

  @ApiProperty({
    required: false,
    description: 'Descrição do tipo de documento',
    maxLength: 255,
    example: 'Bilhete de Identidade',
  })
  @MaxLength(255, { message: ValidationMessages.FIELD_NOT_FOUND
    .replace('{campo}', 'descrição')
    .replace('{entidade}', 'documento') })
  description?: string;
}