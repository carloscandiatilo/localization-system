import { IsString, IsNotEmpty, IsEnum, MaxLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core/base/dto/base.dto';
import { ValidateDocMask } from 'src/shared/validator/doc-mask.validator';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

export enum DocTypeEnum {
  IdentityCard = 'Bilhete de Identidade',
  Passaport = 'Passaporte',
  Other = 'Outro',
}

export class DocTypeDto extends BaseDto {
  @ApiProperty({
    enum: DocTypeEnum,
    description: 'Tipo de documento (Bilhete de Identidade, Passaporte ou Outro)',
    example: DocTypeEnum.IdentityCard,
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
      'Outro': { value: 'Qualquer Documento Válido.' }
    }
  })
  @IsNotEmpty({ message: ValidationMessages.DOCUMENT.MASK_REQUIRED })
  @IsString({ message: ValidationMessages.DOCUMENT.MASK_INVALID_STRING })
  @Validate(ValidateDocMask)
  mask: string;

  @ApiProperty({
    required: false,
    description: 'Descrição do tipo de documento',
    maxLength: 20,
    example: 'Bilhete de Identidade',
  })
  @MaxLength(22, { 
    message: ValidationMessages.DOCUMENT.DESCRIPTION_MAX_LENGTH 
  })
  description?: string;
}