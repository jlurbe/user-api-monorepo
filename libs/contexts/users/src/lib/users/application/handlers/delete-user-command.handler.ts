import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DatabaseRecordNotFoundError } from '@user-api-monorepo/shared/errors/database-record-not-found.error';
import { UserEntity } from '../../domain/entities/user.entity';

export class DeleteUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: UserPrimitive['id']): Promise<void> {
    try {
      const userPrimitive = await this.userRepository.getUser(id);

      if (!userPrimitive) {
        throw new DatabaseRecordNotFoundError(
          this.constructor.name,
          'execute',
          id,
        );
      }

      UserEntity.fromPrimitives(userPrimitive);

      return this.userRepository.deleteUser(id);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
