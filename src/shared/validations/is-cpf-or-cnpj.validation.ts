import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { cpf as validateCpf, cnpj as validateCnpj } from 'cpf-cnpj-validator'; 

@ValidatorConstraint({ name: 'IsCpfOrCnpj', async: false })
export class IsCpfOrCnpj implements ValidatorConstraintInterface {
  validate(document: string, args: ValidationArguments) {
    const isCnpj = document?.match(/\d{2}\.\d{3}\.\d{3}\/0001-\d{2}|\d{8}0001\d{2}/g)
    if (isCnpj) {
      return validateCnpj?.isValid(document);
    }
    return validateCpf?.isValid(document);
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid document";
  }
}