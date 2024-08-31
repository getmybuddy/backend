import { Module } from '@nestjs/common';

import { GroqController } from './groq.controller';
import { GroqService } from './groq.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [GroqController],
  providers: [GroqService],
  imports: [SharedModule],
})
export class GroqModule {}
