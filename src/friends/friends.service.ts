import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { CreateFriendDto } from './dto/create-friend.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: TokenPayload, data: CreateFriendDto) {
    try {
      return await this.prismaService.friend.create({
        data: {
          ...data,
          userId: user.userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findFriendsByUserId(user: TokenPayload) {
    return this.prismaService.friend.findMany({
      where: {
        userId: user.userId,
      },
    });
  }

  async findFriendById(friendId: number) {
    return this.prismaService.friend.findUnique({
      where: { id: friendId },
    });
  }
}
