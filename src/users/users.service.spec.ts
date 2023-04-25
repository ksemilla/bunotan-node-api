import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository = {
    save: jest.fn().mockImplementation((user: CreateUserDto) =>
      Promise.resolve({
        id: 1,
        username: user.username,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user record', async () => {
    expect(
      await service.create({
        username: 'testuser',
        password: 'test',
      }),
    ).toEqual({
      id: expect.any(Number),
      username: 'testuser',
    });
  });
});
