import { container } from "tsyringe";

import { SparkBankProvider } from "../../providers/bank-provider/implementations/spark-bank.provider";
import { IBankProvider } from './../../providers/bank-provider/bank.provider.interface';

import { SSMProvider } from "../../providers/secret-provider/implementations/ssm.provider";
import { ISecretProvider } from "../../providers/secret-provider/secret.provider.interface";

import { InvoiceService } from "../../services/invoice.service";

container.registerSingleton<InvoiceService>("InvoiceService", InvoiceService);
container.registerSingleton<IBankProvider>("BankProvider", SparkBankProvider);
container.registerSingleton<ISecretProvider>("SecretProvider", SSMProvider);