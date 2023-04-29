import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import StripeService from 'src/payments/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, StripeService],
  controllers: [UsersController],
})
export class UsersModule {}
