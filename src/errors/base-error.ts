export class BaseError {
  message: string;
  statusCode: number;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
