import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { FindOneOptions } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { VerifyTokenDto } from './dto/verify.dto';

describe('AuthController', () => {
  const users: User[] = [
    {
      id: 1,
      username: 'existingUser',
      password: 'test',
      email: 'test@test.com',
      firstName: 'Existing',
      lastName: 'User',
      isActive: true,
    },
  ];
  let controller: AuthController;
  let mockAuthService = {
    signIn: jest.fn().mockImplementation((signInDto: SignInDto) => {
      const user = users.find((val) => val.username === signInDto.username);
      if (user && user.password === signInDto.password) {
        return {
          accessToken: 'test-token',
        };
      } else if (user && signInDto.password !== user.password) {
        throw new BadRequestException('wrong password');
      }
      throw new BadRequestException('no user found');
    }),
    verifyToken: jest.fn().mockImplementation((verifyToken: VerifyTokenDto) => {
      switch (verifyToken.accessToken) {
        case 'test-token':
          return { ...users[0] };
        default:
          throw new UnauthorizedException();
      }
    }),
  };
  let mockUsersRepository = {
    findOne: jest.fn().mockImplementation((options: FindOneOptions<User>) => {
      const filter = options.where as User;
      return users.find((val) => val.username === filter.username);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log user in', async () => {
    expect(
      await controller.login({
        username: 'existingUser',
        password: 'test',
      }),
    ).toEqual({
      accessToken: 'test-token',
    });
  });

  it('should fail to see not existing user', async () => {
    try {
      await controller.login({
        username: 'notExistongUser',
        password: 'noice',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toEqual('no user found');
    }
  });

  it('should reject incorrect password', async () => {
    try {
      await controller.login({
        username: 'existingUser',
        password: 'noice',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toEqual('wrong password');
    }
  });

  it('should accept token for verification', async () => {
    expect(
      await controller.verify({
        accessToken: 'test-token',
      }),
    ).toEqual({ ...users[0] });
  });

  it('should reject invalid token', async () => {
    try {
      await controller.verify({
        accessToken: 'fail-token',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
