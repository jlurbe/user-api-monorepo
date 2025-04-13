import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserQueryHandler } from '@user-api-monorepo/users/application/handlers/get-user-query.handler';
import { GetUsersQueryHandler } from '@user-api-monorepo/users/application/handlers/get-users-query.handler';
import { CreateUserCommandHandler } from '@user-api-monorepo/users/application/handlers/create-user-command.handler';
import { UpdateUserCommandHandler } from '@user-api-monorepo/users/application/handlers/update-user-command.handler';
import { DeleteUserCommandHandler } from '@user-api-monorepo/users/application/handlers/delete-user-command.handler';
import { UpdateUserCommand } from '@user-api-monorepo/users/application/commands/update-user.command';
import { CreateUserCommand } from '../../../../../libs/contexts/users/src/lib/users/application/commands/create-user.command';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly GetUsersQueryHandler: GetUsersQueryHandler,
    private readonly GetUserQueryHandler: GetUserQueryHandler,
    private readonly CreateUserCommandHandler: CreateUserCommandHandler,
    private readonly UpdateUserCommandHandler: UpdateUserCommandHandler,
    private readonly DeleteUserCommandHandler: DeleteUserCommandHandler,
  ) {}
  @Get()
  getUsers() {
    return this.GetUsersQueryHandler.execute();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    description: 'User ID',
  })
  getUser(@Param('id') userId: string) {
    return this.GetUserQueryHandler.execute({ id: userId });
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserCommand) {
    return this.CreateUserCommandHandler.execute(createUserRequest);
  }

  @Patch(':id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    description: 'User ID',
  })
  updateUser(
    @Param('id') userId,
    @Body() updateUserRequest: Omit<UpdateUserCommand, 'id'>,
  ) {
    return this.UpdateUserCommandHandler.execute({
      ...updateUserRequest,
      id: userId,
    });
  }

  @Delete(':id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    description: 'User ID',
  })
  deleteUser(@Param('id') userId: string) {
    return this.DeleteUserCommandHandler.execute(userId);
  }
}
