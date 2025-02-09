import { Controller, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { message: 'All users' };
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
