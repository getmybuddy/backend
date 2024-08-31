import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class groqChatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
