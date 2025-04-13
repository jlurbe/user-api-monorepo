import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserQuery } from '../queries/get-user.query';

export class GetUserQueryHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    getUserQuery: GetUserQuery,
  ): Promise<UserPrimitive | undefined> {
    try {
      return this.userRepository.getUser(getUserQuery.id);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
