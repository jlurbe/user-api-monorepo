import { UserPrimitive } from '../primitives/user.primitive';
import { Entity } from '@user-api-monorepo/shared-kernel/domain/entities/entity';
import { UserIdValueObject } from '../value-objects/user-id.value-object';
import { UserNameValueObject } from '../value-objects/user-name.value-object';
import { UserEmailValueObject } from '../value-objects/user-email.value-object';
import { UserPasswordValueObject } from '../value-objects/user-password.value-object';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { v4 as uuid } from 'uuid';
import { SaveUserDTO } from '../dto/save-user.dto';

export class UserEntity extends Entity<UserEntity, UserPrimitive> {
  readonly id: UserIdValueObject;
  name: UserNameValueObject;
  email: UserEmailValueObject;
  password: UserPasswordValueObject;

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

  changeName(userName: string): SaveUserDTO {
    this.name = new UserNameValueObject(userName);

    return this.toPersistenceDTO(true, false, false);
  }

  changeEmail(userEmail: string): SaveUserDTO {
    this.email = new UserEmailValueObject(userEmail);

    return this.toPersistenceDTO(false, true, false);
  }

  async changePassword(userPassword: string): Promise<SaveUserDTO> {
    this.password = await UserPasswordValueObject.create(userPassword);

    return this.toPersistenceDTO(false, false, true);
  }

  private toPersistenceDTO(
    name: boolean,
    email: boolean,
    password: boolean,
  ): SaveUserDTO {
    return {
      id: this.id._value,
      ...(name && { name: this.name._value }),
      ...(email && { email: this.email._value }),
      ...(password && { password: this.password._value }),
    };
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
