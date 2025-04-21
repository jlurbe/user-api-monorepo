import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserQuery } from '../queries/get-user.query';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseRecordNotFoundError } from '@user-api-monorepo/shared/errors/database-record-not-found.error';

export class GetUserQueryHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    getUserQuery: GetUserQuery,
  ): Promise<UserPrimitive | undefined> {
    try {
      const userPrimitive = await this.userRepository.getUser(getUserQuery.id);

      if (!userPrimitive) {
        throw new DatabaseRecordNotFoundError(
          this.constructor.name,
          'execute',
          getUserQuery.id,
        );
      }

      const user = UserEntity.fromPrimitives(userPrimitive);

      return user.toPrimitives();
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
