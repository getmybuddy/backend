import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import ms from 'ms';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import { IdentifierDto } from './dto/identifier.dto';
import { UsersService } from '../users/users.service';
import { SharedService } from '../shared/shared.service';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
  ) {}

  private async isEmail(identifier: string): Promise<boolean> {
    const identifierDto = new IdentifierDto(identifier);
    const errors = await validate(identifierDto);
    return errors.length === 0;
  }

  private async getUserByIdentifier(identifier: string) {
    const isEmail = await this.isEmail(identifier);

    const filter: Prisma.UserWhereUniqueInput = isEmail
      ? { email: identifier }
      : { username: identifier };

    return this.usersService.getUser(filter);
  }

  async verifyUser(identifier: string, password: string) {
    try {
      const user = await this.getUserByIdentifier(identifier);

      if (user === null) {
        throw new UnauthorizedException('Credentials are not valid.');
      }

      const authenticated = await bcrypt.compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException('Credentials are not valid.');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async login(userData: User, response: Response) {
    const expires = new Date();

    expires.setMilliseconds(
      expires.getMilliseconds() + ms(this.sharedService.jwtExpiration),
    );

    const tokenPayload: TokenPayload = {
      userId: userData.id,
    };
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return { tokenPayload };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
