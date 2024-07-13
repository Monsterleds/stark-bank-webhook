import { Invoice, Transfer } from "starkbank";

export interface ICreateSingleInvoice {
  amount: number;
  taxId: string;
  name: string;
}

export type AccountTypes = "checking" | "payment" | "savings" | "salary" | "checking";

export interface ICreateTransfer {
  amount: number;
  name: string;
  bankCode: string;
  taxId: string;
  externalId: string;
  branchCode: string,
  accountNumber: string;
  accountType: AccountTypes;
}

export interface IBankProvider {
  createSingleInvoice(invoice: ICreateSingleInvoice): Promise<Invoice>;
  createTransfer(transfer: ICreateTransfer): Promise<Transfer>;
}
