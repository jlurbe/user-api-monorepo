import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { randomUUID } from 'crypto';

export class CreateUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserCommand: CreateUserCommand): Promise<void> {
    try {
      const user = { id: randomUUID(), ...createUserCommand };

      return this.userRepository.saveUser(user);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
