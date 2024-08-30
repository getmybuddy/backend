import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './models/user-response.model';
import { WebResponse } from '../common/models/web-response.model';
import { ApiCreatedResponseCustom } from '../common/utils/custom-api-response.util';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

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

  @ApiCookieAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {
    return {
      statusCode: 200,
      message: 'User retrieved successfully.',
      data: user,
    };
  }
}
