import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../strategy';
import { UserRepository } from 'src/shared/repositories';
import { TokensGenerate } from 'src/helpers';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserRepository,
    TokensGenerate,
  ],
})
export class AuthModule {}
