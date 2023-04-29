import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_API_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer() {
    return this.stripe.customers.create();
  }
}
