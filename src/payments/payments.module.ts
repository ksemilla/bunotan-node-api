import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import StripeService from './stripe.service';
import { DrawLotsService } from 'src/draw-lots/draw-lots.service';
import { DrawLot } from 'src/draw-lots/draw-lots.entity';

@Module({
  controllers: [PaymentsController],
  providers: [UsersService, StripeService, DrawLotsService],
  imports: [TypeOrmModule.forFeature([User, DrawLot])],
})
export class PaymentsModule {}
