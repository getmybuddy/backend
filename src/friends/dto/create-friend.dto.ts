import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  age: number;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: Gender;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  occupation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  personalities: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @ApiProperty()
  @IsString()
  shortBio: string;
}
