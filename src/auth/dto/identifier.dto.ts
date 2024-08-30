import { IsEmail } from 'class-validator';

export class IdentifierDto {
  @IsEmail()
  email: string;

  constructor(identifier: string) {
    this.email = identifier;
  }
}
