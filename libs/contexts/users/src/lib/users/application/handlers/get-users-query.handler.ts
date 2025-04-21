import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class GetUsersQueryHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserPrimitive[]> {
    try {
      const usersPrimitives = await this.userRepository.getUsers();
      const users = usersPrimitives.map((userPrimitive) =>
        UserEntity.fromPrimitives(userPrimitive),
      );

      return users.map((user) => user.toPrimitives());
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(this.constructor.name, 'execute', '');
    }
  }
}
