import { InvalidEmailError } from '../errors/invalid-email.error';
import { StringValueObject } from './string.value-object';

export class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailError(this.constructor.name, email);
    }
  }
}
