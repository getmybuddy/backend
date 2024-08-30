import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '../interfaces/token-payload.interface';
import { SharedService } from '../../shared/shared.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(sharedService: SharedService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication;
        },
      ]),
      secretOrKey: sharedService.jwtSecret,
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
