import { BaseError } from '@user-api-monorepo/shared/errors/base.error';
import { UnexpectedError } from '@user-api-monorepo/shared/errors/unexpected.error';
import { SaveUserDTO } from '../../domain/dto/save-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { DatabaseRecordNotFoundError } from '@user-api-monorepo/shared/errors/database-record-not-found.error';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserCommand } from '../commands/update-user.command';

export class UpdateUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserCommand: UpdateUserCommand): Promise<UserPrimitive> {
    try {
      const userPrimitive = await this.userRepository.getUser(
        updateUserCommand.id,
      );

      if (!userPrimitive) {
        throw new DatabaseRecordNotFoundError(
          this.constructor.name,
          'execute',
          updateUserCommand.id,
        );
      }

      const user = UserEntity.fromPrimitives(userPrimitive);

      const userPersistenceDTO: SaveUserDTO = {
        id: updateUserCommand.id,
        ...(updateUserCommand.name && user.changeName(updateUserCommand.name)),
        ...(updateUserCommand.email &&
          user.changeEmail(updateUserCommand.email)),
        ...(updateUserCommand.password &&
          (await user.changePassword(updateUserCommand.password))),
      };
      await this.userRepository.saveUser(userPersistenceDTO);

      return user.toPrimitives();
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new UnexpectedError(
        this.constructor.name,
        'execute',
        JSON.stringify(updateUserCommand),
      );
    }
  }
}
