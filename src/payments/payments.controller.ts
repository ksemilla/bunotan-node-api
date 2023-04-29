import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/auth.public';
import { DrawLotsService } from 'src/draw-lots/draw-lots.service';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK;

@Controller('sw')
export class PaymentsController {
  constructor(
    private usersService: UsersService,
    private drawLotsService: DrawLotsService,
  ) {}

  @Public()
  @Post()
  async paymentHandler(@Req() request: Request, @Body() body: Buffer) {
    const sig = request.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {}

    // console.log(event);

    switch (event.type) {
      case 'charge.succeeded':
        const data = event.data.object as { customer: string };
        const user = await this.usersService.findOne({
          where: { stripeCustomerId: data.customer },
        });

        console.log('user', user);

        const drawLot = await this.drawLotsService.create({ owner: user });
        console.log('ahhe', drawLot);

        break;
      default:
        break;
    }
  }
}
