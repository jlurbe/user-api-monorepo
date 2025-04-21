import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserPrimitive } from '../../domain/primitives/user.primitive';

export class CreateUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserCommand: CreateUserCommand): Promise<UserPrimitive> {
    try {
      const user = await UserEntity.fromCreateUserCommand(createUserCommand);

      return this.userRepository.saveUser(user.toPrimitives());
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
