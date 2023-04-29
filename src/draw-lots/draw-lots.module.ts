import { Module } from '@nestjs/common';
import { DrawLotsController } from './draw-lots.controller';
import { DrawLotsService } from './draw-lots.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import StripeService from 'src/payments/stripe.service';
import { DrawLot } from './draw-lots.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrawLot, User])],
  controllers: [DrawLotsController],
  providers: [DrawLotsService, UsersService, StripeService],
})
export class DrawLotsModule {}
