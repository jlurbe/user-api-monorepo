import { InvalidPasswordError } from '../errors/invalid-password.error';
import { StringValueObject } from './string.value-object';
import { PasswordUtils } from '@user-api-monorepo/shared/utils/password.utils';

export class PasswordValueObject extends StringValueObject {
  public static async create(
    plainPassword: string,
  ): Promise<PasswordValueObject> {
    if (!this.ensureIsValidPasssword(plainPassword)) {
      throw new InvalidPasswordError(this.constructor.name, plainPassword);
    }

    const hashedPassword = await PasswordUtils.hash(plainPassword);

    return new PasswordValueObject(hashedPassword);
  }

  private static ensureIsValidPasssword(password: string): boolean {
    return (
      password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)
    );
  }
}
