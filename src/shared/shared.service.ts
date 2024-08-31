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

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get groqApiBaseUrl(): string {
    return this.get('GROQ_API_BASE_URL');
  }

  get groqApiKey(): string {
    return this.get('GROQ_API_KEY');
  }

  get langchainTracingV2(): string {
    return this.get('LANGCHAIN_TRACING_V2');
  }

  get langchainApiKey(): string {
    return this.get('LANGCHAIN_API_KEY');
  }

  get langchainCallbacksBackground(): string {
    return this.get('LANGCHAIN_CALLBACKS_BACKGROUND');
  }

  get langchainProject(): string {
    return this.get('LANGCHAIN_PROJECT');
  }
}
