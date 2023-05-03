import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { DrawLot } from './draw-lots.entity';
import { DrawLotsService } from './draw-lots.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DrawLotQueryDto } from './dto/query-draw-lot.dto';
import { FindAllResult } from 'src/interfaces';
import { UpdateDrawLotDto } from './dto/update-draw-lot.dto';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

@Controller('draw-lots')
export class DrawLotsController {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private drawLotsService: DrawLotsService,
  ) {}
  @Post()
  async create(@Request() req): Promise<{ url: string }> {
    const user = await this.usersService.findOne({
      where: { id: req.user.sub },
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: this.configService.get<string>('PRICE_ID'),
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get<string>('FRONT_END_URL')}/success`,
      cancel_url: `${this.configService.get<string>('FRONT_END_URL')}/cancel`,
      customer: user.stripeCustomerId,
    });
    return { url: session.url };
  }

  @Get()
  async list(
    @Request() req,
    @Query() query: DrawLotQueryDto,
  ): Promise<Promise<FindAllResult<DrawLot>>> {
    const drawLots = await this.drawLotsService.findAll({
      where: {
        owner: {
          id: req.user.sub,
        },
      },
      select: {
        owner: {
          id: true,
        },
      },
      relations: ['owner'],
      take: query.limit,
      skip: query.skip,
    });
    return drawLots;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<DrawLot> {
    return this.drawLotsService.findOne({
      where: {
        id,
      },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() drawLotDto: UpdateDrawLotDto,
  ): Promise<UpdateResult> {
    return this.drawLotsService.update(id, drawLotDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.drawLotsService.delete(id);
  }
}
