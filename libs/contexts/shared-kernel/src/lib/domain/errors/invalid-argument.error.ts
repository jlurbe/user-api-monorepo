import {
  BaseError,
  HttpStatusCode,
} from '@user-api-monorepo/shared/errors/base.error';

export class InvalidArgumentError extends BaseError {
  constructor(className: string, fieldValue: unknown) {
    super(
      HttpStatusCode.BAD_REQUEST,
      `<${className}> doesn't allow the value <${fieldValue}>`,
    );
  }
}
