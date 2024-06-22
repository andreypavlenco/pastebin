import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/models/user.entity';
import { createUserDto } from 'src/modules/auth/dto/createUserDto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private userRepository: Repository<UserEntity>;
  private logger = new Logger(UserRepository.name);

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async saveUser(dto: createUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.save({ ...dto, refreshToken: '' });
    } catch (error) {
      this.logger.error(
        `Failed to save new user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to find user by email: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async updateUserRefreshToken(
    userId: number,
    hashRefreshToken: string,
  ): Promise<UserEntity> {
    try {
      await this.userRepository.update(userId, {
        refreshToken: hashRefreshToken,
      });
      const updatedUser = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      return updatedUser;
    } catch (error) {
      this.logger.error(
        `Failed to update user refresh token: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findUserById(userId: number): Promise<UserEntity> {
    try {
      const updatedUser = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`, error.stack);
      throw error;
    }
  }
}
