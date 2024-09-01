import { Module } from '@nestjs/common';

import { GroqController } from './groq.controller';
import { GroqService } from './groq.service';
import { SharedModule } from '../shared/shared.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  controllers: [GroqController],
  providers: [GroqService],
  imports: [SharedModule, FriendsModule],
})
export class GroqModule {}
