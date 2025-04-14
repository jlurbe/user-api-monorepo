import { UserPrimitive } from '../primitives/user.primitive';
import { Entity } from '@user-api-monorepo/shared-kernel/domain/entities/entity';
import { UserIdValueObject } from '../value-objects/user-id.value-object';
import { UserNameValueObject } from '../value-objects/user-name.value-object';
import { UserEmailValueObject } from '../value-objects/user-email.value-object';
import { UserPasswordValueObject } from '../value-objects/user-password.value-object';

export class UserEntity extends Entity<UserEntity, UserPrimitive> {
  readonly id: UserIdValueObject;
  readonly name: UserNameValueObject;
  readonly email: UserEmailValueObject;
  readonly password: UserPasswordValueObject;

  constructor({
    id,
    name,
    email,
    password,
  }: {
    id: UserIdValueObject;
    name: UserNameValueObject;
    email: UserEmailValueObject;
    password: UserPasswordValueObject;
  }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toPrimitives(): UserPrimitive {
    return {
      id: this.id._value,
      name: this.name._value,
      email: this.email._value,
      password: this.password._value,
    };
  }
}
