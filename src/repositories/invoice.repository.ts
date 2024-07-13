import { Repository } from "typeorm";
import { Invoice } from "../models/invoice.model";
import { AppDataSource } from "../configs/databases/mysql";
import { ICreateInvoice, IInvoiceRepository, IUpdateByStarkWebhookId } from "./abstracts/invoice.repository.interface";

export class InvoiceRepository implements IInvoiceRepository {
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

  async updateByStarkWebhookId({ starkWebhookId, ...invoice }: IUpdateByStarkWebhookId): Promise<Invoice | null> {
    await this.invoiceRepository.update({ starkWebhookId }, invoice);
    return this.invoiceRepository.findOneBy({ starkWebhookId });
  }
}
