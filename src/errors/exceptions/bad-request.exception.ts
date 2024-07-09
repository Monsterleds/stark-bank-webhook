import { BaseError } from "../base-error";

export class BadRequestException extends BaseError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}
