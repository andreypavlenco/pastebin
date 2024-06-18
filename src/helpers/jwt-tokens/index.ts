import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensGenerate {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.access_secret'),
          expiresIn: '2h',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.refresh_secret'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
