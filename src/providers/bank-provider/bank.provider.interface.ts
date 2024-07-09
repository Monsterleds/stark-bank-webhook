export interface ICreateSingleInvoice {
  amount: number;
  taxId: string;
  name: string;
}

export interface ICreateSingleInvoiceResponse {
  id: string;
  amount: number;
}

interface IBankProvider {
  createSingleInvoice(invoice: ICreateSingleInvoice): Promise<ICreateSingleInvoiceResponse>;
}

export { IBankProvider };
