import { UserPrimitive } from '../primitives/user.primitive';
import { Entity } from '@user-api-monorepo/shared-kernel/domain/entities/entity';
import { UserIdValueObject } from '../value-objects/user-id.value-object';
import { UserNameValueObject } from '../value-objects/user-name.value-object';
import { UserEmailValueObject } from '../value-objects/user-email.value-object';
import { UserPasswordValueObject } from '../value-objects/user-password.value-object';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { v4 as uuid } from 'uuid';

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

  static fromPrimitives(userPrimitive: UserPrimitive): UserEntity {
    return new UserEntity({
      id: new UserIdValueObject(userPrimitive.id),
      name: new UserNameValueObject(userPrimitive.name),
      email: new UserEmailValueObject(userPrimitive.email),
      password: new UserPasswordValueObject(userPrimitive.password),
    });
  }

  static async fromCreateUserCommand(
    createUserCommand: CreateUserCommand,
  ): Promise<UserEntity> {
    return new UserEntity({
      id: new UserIdValueObject(uuid()),
      name: new UserNameValueObject(createUserCommand.name),
      email: new UserEmailValueObject(createUserCommand.email),
      password: await UserPasswordValueObject.create(
        createUserCommand.password,
      ),
    });
  }
}
