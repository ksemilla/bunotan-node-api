import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneOptions } from 'typeorm';
import { User } from './users.entity';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService = {
    create: jest.fn().mockImplementation((user: CreateUserDto) =>
      Promise.resolve({
        id: 2,
        username: user.username,
      }),
    ),
    findOne: jest.fn().mockImplementation((options: FindOneOptions<User>) => {
      const filter = options.where as Partial<User>;
      if (filter.username === 'existingUser') {
        return Promise.resolve({
          id: 1,
          username: 'existingUser',
        });
      }
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(
      await controller.create({
        username: 'testUser',
        password: 'test',
      }),
    ).toEqual({
      id: expect.any(Number),
    });
  });

  it('should not create an existing user', async () => {
    expect(async () => {
      await controller.create({
        username: 'existingUser',
        password: 'test',
      });
    }).rejects.toThrowError(BadRequestException);
  });
});
