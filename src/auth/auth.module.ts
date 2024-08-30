import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (sharedService: SharedService) => ({
        secret: sharedService.jwtSecret,
        signOptions: {
          expiresIn: sharedService.jwtExpiration,
        },
      }),
      inject: [SharedService],
    }),
  ],
})
export class AuthModule {}
