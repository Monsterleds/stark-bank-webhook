import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { IsCpfOrCnpj } from "../../shared/validations/is-cpf-or-cnpj.validation";

export class CreateInvoiceDTO {
  @Validate(IsCpfOrCnpj)
  @IsNotEmpty()
  document: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}