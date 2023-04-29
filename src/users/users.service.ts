import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllResult } from 'src/interfaces';
import StripeService from 'src/payments/stripe.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private stripeService: StripeService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const stripeCustomer = await this.stripeService.createCustomer();
    const user = await this.usersRepository.save({
      ...createUserDto,
      stripeCustomerId: stripeCustomer.id,
    });
    if (!user) throw new BadRequestException('Cannot create user');
    return user;
  }

  async findAll(options?: FindManyOptions<User>): Promise<FindAllResult<User>> {
    const [data, count] = await this.usersRepository.findAndCount(options);
    return { count, data };
  }

  async findOne(options?: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
