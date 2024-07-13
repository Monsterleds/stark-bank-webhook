import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { generate } from "gerador-validador-cpf";
import { uniqueNamesGenerator, names } from "unique-names-generator";

import { InvoiceService } from "../services/invoice.service";
import {
  AccountTypes,
  IBankProvider,
} from "../providers/bank-provider/bank.provider.interface";
import { NotImplementedException } from "../errors/exceptions/not-implemented.exception";
import {
  generateRandomValues,
  generateRandomNumberBetween8and12,
} from "../utils/math";

@injectable()
export class InvoiceController {
  constructor(
    @inject("BankProvider")
    private bankProvider: IBankProvider,
    private invoiceService: InvoiceService
  ) {}

  async createBetween8And12() {
    const invoicesAmount = generateRandomNumberBetween8and12();

    // Se tivesse muito mais invoices ou essa função fosse trigado diversas vezes, talvez faça sentido colocar envolta de um Promise.all e deixar ela mais "enxuta"
    for (let i = 0; i < invoicesAmount; i++) {
      await this.invoiceService.create({
        amount: generateRandomValues(4),
        document: generate(),
        name: uniqueNamesGenerator({ dictionaries: [names] }),
      });
    }
  }

  async webhook(req: Request, res: Response) {
    const { id, status, nominalAmount } = req.body.event.log.invoice;

    await this.invoiceService.updateByStarkWebhookId({
      starkWebhookId: id,
      status,
    });

    /**
     * @todo
     * CRIAR TRATATIVA GLOBAL DAS .ENVS E VERIFICAR AO STARTAR A APLICAÇÃO E REMOVER OS IFS */
    if (
      !process.env.STARK_BANK_ACCOUNT_TYPE ||
      !process.env.STARK_BANK_ACCOUNT_TAX_ID ||
      !process.env.STARK_BANK_ACCOUNT_NAME ||
      !process.env.STARK_BANK_ACCOUNT_NUMBER ||
      !process.env.STARK_BANK_BRANCH_CODE ||
      !process.env.STARK_BANK_BANK_CODE
    ) {
      throw new NotImplementedException(
        'Enviroments variables with prefix "STAR_BANK_*" are required'
      );
    }

    await this.bankProvider.createTransfer({
      bankCode: process.env.STARK_BANK_BANK_CODE,
      branchCode: process.env.STARK_BANK_BRANCH_CODE,
      accountNumber: process.env.STARK_BANK_ACCOUNT_NUMBER,
      name: process.env.STARK_BANK_ACCOUNT_NAME,
      taxId: process.env.STARK_BANK_ACCOUNT_TAX_ID,
      accountType: process.env.STARK_BANK_ACCOUNT_TYPE as AccountTypes, // REFATORAR ENVS
      amount: nominalAmount,
      externalId: id,
    });

    return res.send();
  }
}
