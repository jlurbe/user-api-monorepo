import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@user-api-monorepo/users/domain/repositories/user.repository';
import { UserTypeormRepository } from '@user-api-monorepo/users/infrastructure/repositories/user-typeorm.repository';
import { UserTypeormEntity } from '@user-api-monorepo/users/infrastructure/entities/user-typeorm.entity';
import { GetUsersApplication } from '../../../../../libs/contexts/users/src/lib/users/application/getUsers.application';
import { USER_REPOSITORY } from './constants/users.constants';

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
      provide: GetUsersApplication,
      useFactory: (userRepository: UserRepository): GetUsersApplication => {
        return new GetUsersApplication(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
  ],
})
export class UsersModule {}
