import { BaseError } from "../base-error";

export class NotImplementedException extends BaseError {
  constructor(message = 'Not Implemented') {
    super(501, message);
  }
}
