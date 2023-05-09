import { Module } from '@nestjs/common';
import { DrawLotsController, MembersController } from './draw-lots.controller';
import { DrawLotsService, MembersService } from './draw-lots.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import StripeService from 'src/payments/stripe.service';
import { DrawLot, Member } from './draw-lots.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrawLot, User, Member])],
  controllers: [DrawLotsController, MembersController],
  providers: [DrawLotsService, UsersService, StripeService, MembersService],
})
export class DrawLotsModule {}
