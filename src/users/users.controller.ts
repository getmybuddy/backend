import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './models/user-response.model';
import { WebResponse } from 'src/common/models/web-response.model';
import { ApiCreatedResponseCustom } from 'src/common/utils/custom-api-response.util';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponseCustom({
    type: UserResponse,
    description: 'User created successfully.',
  })
  async create(
    @Body() request: CreateUserDto,
  ): Promise<WebResponse<UserResponse>> {
    const response = await this.usersService.create(request);
    return {
      statusCode: 201,
      message: 'User created successfully.',
      data: response,
    };
  }
}
