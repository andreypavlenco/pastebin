import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/models/user.entity';
import { createUserDto } from 'src/modules/auth/dto/createUserDto';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from 'src/shared/repositories';

const mockUserRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userRepoMock: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userRepoMock = module.get(getRepositoryToken(UserEntity));
  });

  describe('saveUser', () => {
    it('should save a user', async () => {
      const dto: createUserDto = { email: 'test@test.com', password: '123456' };
      const savedUser = { user_id: 1, ...dto, refreshToken: '' };
      userRepoMock.save.mockResolvedValue(savedUser as UserEntity);

      const result = await userRepository.saveUser(dto);

      expect(userRepoMock.save).toHaveBeenCalledWith({
        ...dto,
        refreshToken: '',
      });
      expect(result).toEqual(savedUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user if found', async () => {
      const email = 'test@test.com';
      const user = { user_id: 1, email, password: '123456', refreshToken: '' };
      userRepoMock.findOne.mockResolvedValue(user as UserEntity);

      const result = await userRepository.findUserByEmail(email);

      expect(userRepoMock.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const email = 'test@test.com';
      userRepoMock.findOne.mockResolvedValue(null);

      const result = await userRepository.findUserByEmail(email);

      expect(userRepoMock.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeNull();
    });
  });

  describe('updateUserRefreshToken', () => {
    it('should update the user refresh token', async () => {
      const userId = 1;
      const hashRefreshToken = 'newRefreshToken';
      const updatedUser = {
        user_id: userId,
        email: 'test@test.com',
        password: '123456',
        refreshToken: hashRefreshToken,
      };
      userRepoMock.update.mockResolvedValue(undefined);
      userRepoMock.findOne.mockResolvedValue(updatedUser as UserEntity);

      const result = await userRepository.updateUserRefreshToken(
        userId,
        hashRefreshToken,
      );

      expect(userRepoMock.update).toHaveBeenCalledWith(userId, {
        refreshToken: hashRefreshToken,
      });
      expect(userRepoMock.findOne).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      const userId = 1;
      const user = {
        user_id: userId,
        email: 'test@test.com',
        password: '123456',
        refreshToken: '',
      };
      userRepoMock.findOne.mockResolvedValue(user as UserEntity);

      const result = await userRepository.findUserById(userId);

      expect(userRepoMock.findOne).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const userId = 1;
      userRepoMock.findOne.mockResolvedValue(null);

      const result = await userRepository.findUserById(userId);

      expect(userRepoMock.findOne).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(result).toBeNull();
    });
  });
});
