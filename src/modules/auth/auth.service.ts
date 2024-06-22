import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { createUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { authDto } from './dto/authDto';
import { TokensGenerate } from 'src/helpers';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(TokensGenerate) private tokensGenerate: TokensGenerate,
  ) {}

  async signUp(dto: createUserDto) {
    const userExists = await this.userRepository.findUserByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.saveUser({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.tokensGenerate.getTokens(
      String(newUser.user_id),
      newUser.username,
    );

    await this.updateRefreshToken(newUser.user_id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: authDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('User does not exist');
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.tokensGenerate.getTokens(
      String(user.user_id),
      user.username,
    );
    await this.updateRefreshToken(user.user_id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    try {
      await this.userRepository.updateUserRefreshToken(
        userId,
        hashedRefreshToken,
      );
    } catch (error) {
      throw new Error('Failed to update refresh token');
    }
  }
}
