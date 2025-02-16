import { Controller, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUsersApplication } from '@user-api-monorepo/users/application/getUsers.application';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly getUsersApplication: GetUsersApplication) {}
  @Get()
  getUsers() {
    return this.getUsersApplication.execute();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    description: 'User ID',
  })
  getUser() {
    return { message: 'User' };
  }
}
