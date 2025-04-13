import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@user-api-monorepo/users/domain/repositories/user.repository';
import { UserTypeormRepository } from '@user-api-monorepo/users/infrastructure/repositories/user-typeorm.repository';
import { UserTypeormEntity } from '@user-api-monorepo/users/infrastructure/entities/user-typeorm.entity';
import { USER_REPOSITORY } from './constants/users.constants';
import { GetUsersQueryHandler } from '@user-api-monorepo/users/application/handlers/get-users-query.handler';
import { GetUserQueryHandler } from '@user-api-monorepo/users/application/handlers/get-user-query.handler';
import { CreateUserCommandHandler } from '@user-api-monorepo/users/application/handlers/create-user-command.handler';
import { UpdateUserCommandHandler } from '@user-api-monorepo/users/application/handlers/update-user-command.handler';
import { DeleteUserCommandHandler } from '@user-api-monorepo/users/application/handlers/delete-user-command.handler';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (entityManager: EntityManager): UserRepository => {
        return new UserTypeormRepository(UserTypeormEntity, entityManager);
      },
      inject: [EntityManager],
    },
    {
      provide: GetUsersQueryHandler,
      useFactory: (userRepository: UserRepository): GetUsersQueryHandler => {
        return new GetUsersQueryHandler(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: GetUserQueryHandler,
      useFactory: (userRepository: UserRepository): GetUserQueryHandler => {
        return new GetUserQueryHandler(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: CreateUserCommandHandler,
      useFactory: (
        userRepository: UserRepository,
      ): CreateUserCommandHandler => {
        return new CreateUserCommandHandler(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: UpdateUserCommandHandler,
      useFactory: (
        userRepository: UserRepository,
      ): UpdateUserCommandHandler => {
        return new UpdateUserCommandHandler(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: DeleteUserCommandHandler,
      useFactory: (
        userRepository: UserRepository,
      ): DeleteUserCommandHandler => {
        return new DeleteUserCommandHandler(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
  ],
})
export class UsersModule {}
