interface ISecretProvider {
  getPrivateKey(keyName: string): Promise<string>;
}

export { ISecretProvider };
