import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Friends')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('create')
  async create(
    @CurrentUser() user: TokenPayload,
    @Body() request: CreateFriendDto,
  ) {
    const response = await this.friendsService.create(user, request);

    return {
      statusCode: 201,
      message: 'Friend created successfully.',
      data: response,
    };
  }

  @Get()
  async findFriendsByUserId(@CurrentUser() user: TokenPayload) {
    const response = await this.friendsService.findFriendsByUserId(user);

    return {
      statusCode: 200,
      message: 'Friend retrieved successfully.',
      data: response,
    };
  }
}
