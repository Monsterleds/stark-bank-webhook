import starkbank from "starkbank";

import { IBankProvider, ICreateSingleInvoice, ICreateSingleInvoiceResponse } from "../bank.provider.interface";
import { inject, injectable } from "tsyringe";
import { ISecretProvider } from "../../secret-provider/secret.provider.interface";
import { NotImplementedException } from "../../../errors/exceptions/not-implemented.exception";

@injectable()
class SparkBankProvider implements IBankProvider {
  constructor(
    @inject('SecretProvider')
    private secretProvider: ISecretProvider
  ) {
    this.signIn();
  }

  async signIn() {
    if (
      !process.env.PRIVATE_KEY_SECRET_NAME ||
      !process.env.SPARK_BANK_PROJECT_ID ||
      !process.env.SPARK_BANK_ENVIROMENT
    ) {
      throw new NotImplementedException(
        'Enviroments variables "PRIVATE_KEY_SECRET_NAME", "SPARK_BANK_PROJECT_ID" and "SPARK_BANK_ENVIROMENT" are required'
      );
    }

    const privateKeyContent = await this.secretProvider.getPrivateKey(
      process.env.PRIVATE_KEY_SECRET_NAME
    );

    const user = new starkbank.Project({
      id: process.env.SPARK_BANK_PROJECT_ID,
      environment: process.env.SPARK_BANK_ENVIROMENT,
      privateKey: privateKeyContent,
    });

    starkbank.user = user;
  }

  async createSingleInvoice(invoice: ICreateSingleInvoice): Promise<ICreateSingleInvoiceResponse> {
    if (!starkbank.user?.id) {
      throw new NotImplementedException("Spark Bank not authenticated");
    }

    const [createdInvoice] = await starkbank.invoice.create([invoice as any]); // "any" pois não bate com a tipagem dos parâmetros obrigatórios das docs 

    return createdInvoice;
  }
}
export { SparkBankProvider };
