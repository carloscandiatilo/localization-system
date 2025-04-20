import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ValidationMessages } from '../messages/validation-messages';
import { DocTypeEnum } from 'src/domain/indentification/docType/dto/doc-type-dto';

@ValidatorConstraint({ name: 'ValidateDocMask', async: false })
export class ValidateDocMask implements ValidatorConstraintInterface {
  validate(mask: string, args: ValidationArguments) {
    const obj = args.object as any;
    const docType = obj.name;

    if (docType === DocTypeEnum.BilheteDeIdentidade) {
      return /^\d{9}[A-Za-z]{2}\d{3}$/.test(mask);
    }

    if (docType === DocTypeEnum.Passaporte) {
      return /^[A-Za-z]{1,2}\d{6,10}$/.test(mask);
    }

    if (docType === DocTypeEnum.Outro) {
      return mask.length <= 20;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as any;
    const docType = obj.name;

    if (docType === DocTypeEnum.BilheteDeIdentidade) {
      return ValidationMessages.DOCUMENT.BI.INVALID_MASK;
    }

    if (docType === DocTypeEnum.Passaporte) {
      return ValidationMessages.DOCUMENT.PASSPORT.INVALID_MASK;
    }

    return ValidationMessages.DOCUMENT.OTHER.INVALID_MASK;
  }
}