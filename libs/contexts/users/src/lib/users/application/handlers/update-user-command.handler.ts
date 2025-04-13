import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { SaveUserDTO } from '../../domain/dto/save-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UpdateUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: SaveUserDTO): Promise<void> {
    try {
      return this.userRepository.saveUser(user);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
