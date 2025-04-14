import { InvalidUuidError } from '../errors/invalid-uuid.error';
import { ValueObject } from './value-object';
import { validate } from 'uuid';

export class UuidValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidUuidError(this.constructor.name, id);
    }
  }
}
