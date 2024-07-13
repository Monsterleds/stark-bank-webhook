import { inject, injectable } from "tsyringe";
import { cpf } from 'cpf-cnpj-validator';

import { IBankProvider } from "../providers/bank-provider/bank.provider.interface";
import { InvoiceStatus } from "../models/invoice.model";
import { IInvoiceRepository } from "../repositories/abstracts/invoice.repository.interface";
import { BadRequestException } from "../errors/exceptions/bad-request.exception";

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
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository
  ) {}

  async create(invoice: ICreateInvoiceDTO) {
    const isValidDocument = cpf.isValid(invoice.document);
    
    if (!isValidDocument) {
      throw new BadRequestException('Invalid document');
    }

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

  async updateByStarkWebhookId(invoice: IUpdateByStarkWebhookId) {
    const newInvoice = await this.invoiceRepository.updateByStarkWebhookId(invoice);
    
    if (!newInvoice) {
      // subir em uma DLQ pra não perder o dado.
      // await sqs.publish('DLQ-XYZ', invoice);

      throw new BadRequestException(`It was not possible to update the invoice with starkWebhookId ${invoice.starkWebhookId}`);
    }

    return newInvoice;
  }
}
