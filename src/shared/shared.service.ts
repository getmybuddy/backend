import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedService {
  constructor(private readonly configService: ConfigService) {}

  private get(key: string): string {
    return this.configService.getOrThrow<string>(key);
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get jwtExpiration(): string {
    return this.get('JWT_EXPIRATION');
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }
}
