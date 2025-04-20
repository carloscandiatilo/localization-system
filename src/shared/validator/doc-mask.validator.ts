import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { DocTypeEnum } from 'src/domain/indentification/docType/dto/doc-type-dto';
  import { ValidationMessages } from 'src/shared/messages/validation-messages';
  import { BILetterPrefix } from './enum/province.enum';
  
  @ValidatorConstraint({ name: 'ValidateDocMask', async: false })
  export class ValidateDocMask implements ValidatorConstraintInterface {
    validate(mask: string, args: ValidationArguments) {
      const obj = args.object as any;
      const docType = obj.name;
  
      if (docType === DocTypeEnum.IdentityCard) {
        const isValidFormat = /^\d{9}[A-Za-z]{2}\d{3}$/.test(mask);
        if (!isValidFormat) return false;
  
        const letters = mask.substring(9, 11).toUpperCase();
        return Object.values(BILetterPrefix).includes(letters as BILetterPrefix);
      }
  
      if (docType === DocTypeEnum.Passaport) {
        return /^[A-Za-z]{1,2}\d{6,10}$/.test(mask);
      }
  
      if (docType === DocTypeEnum.Other) {
        return mask.length <= 20;
      }
  
      return false;
    }
  
    defaultMessage(args: ValidationArguments) {
      const obj = args.object as any;
      const docType = obj.name;
  
      if (docType === DocTypeEnum.IdentityCard) {
        return (
          ValidationMessages.DOCUMENT.BI.INVALID_MASK +
          ` As letras devem ser uma das seguintes: ${Object.values(BILetterPrefix).join(', ')}`
        );
      }
  
      if (docType === DocTypeEnum.Passaport) {
        return ValidationMessages.DOCUMENT.PASSPORT.INVALID_MASK;
      }
  
      return ValidationMessages.DOCUMENT.OTHER.INVALID_MASK;
    }
  }