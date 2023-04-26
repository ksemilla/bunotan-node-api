import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockUsersRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        JwtService,
        AuthService,
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
});
