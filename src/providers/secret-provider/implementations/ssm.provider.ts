import { SSM } from "aws-sdk";

import { ISecretProvider } from "../secret.provider.interface";
import { NotImplementedException } from "../../../errors/exceptions/not-implemented.exception";

class SSMProvider implements ISecretProvider {
  private client: SSM;
  constructor() {
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_REGION
    ) {
      throw new NotImplementedException("AWS credentials are required");
    }

    this.client = new SSM({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }

  async getPrivateKey(privateKeyName: string): Promise<string> {
    const parameter = await this.client
      .getParameter({
        Name: privateKeyName,
        WithDecryption: true,
      })
      .promise();

      if (!parameter.Parameter?.Value) {
        throw new NotImplementedException('Private key not found')
      }

    return parameter.Parameter.Value;
  }
}
export { SSMProvider };
