import { BaseError, HttpStatusCode } from './base.error';

export class DatabaseRecordNotFoundError extends BaseError {
  constructor(className: string, method: string, recordId: string) {
    super(
      HttpStatusCode.NOT_FOUND,
      `<${className}> could not find the record when performing the <${method}> with id <${recordId}>`,
    );
  }
}
