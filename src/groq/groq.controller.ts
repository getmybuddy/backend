import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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

  @Post('chat')
  async handleMessage(@Body() body: groqChatDto): Promise<string> {
    return this.groqService.handleMessage(body.message);
  }
}
