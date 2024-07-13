import { Invoice } from "../../models/invoice.model";
import { InvoiceStatus } from "../../models/invoice.model";

export interface ICreateInvoice {
  amount: number;
  taxId: string;
  name: string;
  starkWebhookId: string;
}

export interface IUpdateByStarkWebhookId {
  starkWebhookId: string;
  amount?: number;
  taxId?: string;
  name?: string;
  status?: InvoiceStatus;
}

export interface IInvoiceRepository {
  create(invoice: ICreateInvoice): Promise<Invoice>;
  updateByStarkWebhookId({ starkWebhookId, ...invoice }: IUpdateByStarkWebhookId): Promise<Invoice | null>;
}