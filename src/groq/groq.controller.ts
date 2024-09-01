import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { GroqService } from './groq.service';
import { groqChatDto } from './dto/groq-chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Groq')
@ApiCookieAuth()
@Controller('groq')
@UseGuards(JwtAuthGuard)
export class GroqController {
  constructor(private readonly groqService: GroqService) {}

  @Post('chat/:friendId')
  async handleMessage(
    @Param('friendId') friendId: string,
    @Body() request: groqChatDto,
  ): Promise<string> {
    return this.groqService.handleMessage(friendId, request.message);
  }
}
