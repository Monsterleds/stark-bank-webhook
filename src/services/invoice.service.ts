import { inject, injectable } from "tsyringe";

import { InvoiceRepository } from "../repositories/invoice.repository";
import { IBankProvider } from "../providers/bank-provider/bank.provider.interface";
import { InvoiceStatus } from "../models/invoice.model";

interface ICreateInvoiceDTO {
  amount: number;
  name: string;
  document: string;
}

interface IUpdateByStarkWebhookId {
  starkWebhookId: string;
  amount?: number;
  taxId?: string;
  name?: string;
  status?: InvoiceStatus;
}

@injectable()
export class InvoiceService {
  constructor(
    @inject("BankProvider")
    private bankProvider: IBankProvider,
    private invoiceRepository: InvoiceRepository
  ) {}

  async create(invoice: ICreateInvoiceDTO) {
    const { id: starkWebhookId } = await this.bankProvider.createSingleInvoice({
      amount: invoice.amount,
      name: invoice.name,
      taxId: invoice.document,
    });
    
    const createdInvoice = await this.invoiceRepository.create({
      name: invoice.name,
      taxId: invoice.document,
      amount: invoice.amount,
      starkWebhookId,
    });
    
    return createdInvoice;
  }

  async findAll() {
    return this.invoiceRepository.findAll();
  }

  async updateByStarkWebhookId(invoice: IUpdateByStarkWebhookId) {
    return this.invoiceRepository.updateByStarkWebhookId(invoice);
  }
}
