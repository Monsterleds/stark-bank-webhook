import { randomUUID }  from 'node:crypto';
import { Invoice as InvoiceStarkBank, Transfer as TransferStarkBank } from 'starkbank';
import { describe, it, expect, jest } from '@jest/globals';
import { generate } from 'gerador-validador-cpf';

import { InvoiceService } from './invoice.service';
import { IBankProvider } from '../providers/bank-provider/bank.provider.interface';
import { ICreateInvoice, IInvoiceRepository, IUpdateByStarkWebhookId } from '../repositories/abstracts/invoice.repository.interface';
import { Invoice } from '../models/invoice.model';
import { generateRandomValues } from '../utils/math';
import { names, uniqueNamesGenerator } from 'unique-names-generator';
import { BadRequestException } from '../errors/exceptions/bad-request.exception';

jest.mock('node-cron', () => ({
  schedule: jest.fn().mockReturnValue({
    stop: jest.fn(),
  }),
}));

/** @todo separar em arquivos de mock.ts simulando um fake repository com mais precisão  */
const fakeBankProvider: IBankProvider = {
  createSingleInvoice: async () => {
    return {
      id: '1234'
    } as InvoiceStarkBank
  },
  createTransfer: async () => {
    return {} as TransferStarkBank
  },
}

let invoices = [] as Invoice[];

const fakeInvoiceRepository: IInvoiceRepository = {
  create: async (invoice: ICreateInvoice) => {
    const newInvoice = {
      id: randomUUID(),
      amount: invoice.amount,
      name: invoice.name,
      starkWebhookId: invoice.starkWebhookId,
      taxId: invoice.taxId,
      status: 'created',
    } as Invoice;

    invoices.push(newInvoice)

    return newInvoice;
  },
  updateByStarkWebhookId: async ({ starkWebhookId, ...invoice }) => {
    let findedInvoice = invoices.find((itemInvoice) => itemInvoice.starkWebhookId === starkWebhookId);
    
    if (!findedInvoice) {
      return null;
    }

    invoices = invoices.map((itemInvoice) => {
      if (itemInvoice.id === findedInvoice.id) return { ...itemInvoice, ...invoice };

      return itemInvoice;
    })

    return { ...findedInvoice, ...invoice };
  },
}

describe("Test invoice use cases", () => {
  const invoiceService = new InvoiceService(fakeBankProvider, fakeInvoiceRepository);

  it("should be able to create an invoice", async () => {
    const invoice = {
      amount: generateRandomValues(4),
      document: generate(),
      name: uniqueNamesGenerator({ dictionaries: [names] }),
    }

    const newInvoice = await invoiceService.create(invoice);

    expect(newInvoice.id).toBeDefined();
    expect(newInvoice.starkWebhookId).toBeDefined();
  });

  it("should not be able to create an invoice", async () => {
    const invoiceWithInvalidDocument = {
      amount: generateRandomValues(4),
      document: '123',
      name: uniqueNamesGenerator({ dictionaries: [names] }),
    }

    expect(invoiceService.create(invoiceWithInvalidDocument)).rejects.toBeInstanceOf(BadRequestException);
  });

  it("should not be able to update invoice status by invalid starkWebhookId", async () => {
    const invalidInvoice: IUpdateByStarkWebhookId = {
      starkWebhookId: '12321',
      status: 'paid',
    };

    await expect(invoiceService.updateByStarkWebhookId(invalidInvoice)).rejects.toBeInstanceOf(BadRequestException);
  });

  /**
   * @todo criar testes e2e usando super test
   * 1 - mockar parameter store da AWS
   * 2 = mockar sdk da stark bank
   */
});
