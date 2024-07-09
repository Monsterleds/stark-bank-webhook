import { BaseError } from "../base-error";

export class ForbiddenException extends BaseError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}
