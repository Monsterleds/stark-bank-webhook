import { Repository } from "typeorm";
import { Invoice, InvoiceStatus } from "../models/invoice.model";
import { AppDataSource } from "../configs/databases/mysql";

interface ICreateInvoice {
  amount: number;
  taxId: string;
  name: string;
  starkWebhookId: string;
}

interface IUpdateInvoice {
  id: string;
  amount?: number;
  taxId?: string;
  name?: string;
  status?: InvoiceStatus;
  starkWebhookId?: string;
}

interface IUpdateByStarkWebhookId {
  starkWebhookId: string;
  amount?: number;
  taxId?: string;
  name?: string;
  status?: InvoiceStatus;
}

export class InvoiceRepository {
  private invoiceRepository: Repository<Invoice>;

  constructor() {
    this.invoiceRepository = AppDataSource.getRepository(Invoice);
  }

  async create(invoice: ICreateInvoice): Promise<Invoice> {
    return this.invoiceRepository.save({
      name: invoice.name,
      amount: invoice.amount,
      starkWebhookId: invoice.starkWebhookId,
      taxId: invoice.taxId,
    });
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  async updateByStarkWebhookId({ starkWebhookId, ...invoice }: IUpdateByStarkWebhookId): Promise<void> {
    await this.invoiceRepository.update({ starkWebhookId }, invoice);
  }

  async updateById(invoice: IUpdateInvoice): Promise<void> {
    await this.invoiceRepository.update({ id: invoice.id }, invoice);
  }

  async findByStarkWebhookId(id: string): Promise<Invoice | null> {
    return this.invoiceRepository.findOneBy({ starkWebhookId: id });
  }
}
