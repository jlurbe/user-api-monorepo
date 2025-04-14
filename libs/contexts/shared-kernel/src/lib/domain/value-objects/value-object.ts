import { ValueNotDefinedError } from '../errors/value-not-defined.error';

export type Primitives =
  | string
  | number
  | boolean
  | Date
  | Record<string, string>;

export abstract class ValueObject<
  T extends Primitives | Record<string, Primitives>,
> {
  readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new ValueNotDefinedError(this.constructor.name, value);
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      this.constructor.name === other.constructor.name &&
      this._value === other._value
    );
  }

  toString(): string {
    return this._value.toString();
  }
}
