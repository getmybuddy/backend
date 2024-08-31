import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { GroqModule } from './groq/groq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (sharedService: SharedService) => {
        const isProduction = sharedService.nodeEnv === 'production';
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [SharedService],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SharedModule,
    GroqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
