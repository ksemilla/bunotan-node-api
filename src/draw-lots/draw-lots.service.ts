import { Injectable } from '@nestjs/common';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { DrawLot } from './draw-lots.entity';
import { CreateDrawLotDto } from './dto/create-draw-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DrawLotsService {
  constructor(
    @InjectRepository(DrawLot)
    private readonly drawLotsRepository: Repository<DrawLot>,
  ) {}
  async create(drawLotDto: CreateDrawLotDto): Promise<DrawLot> {
    // return;
    return this.drawLotsRepository.save(drawLotDto);
  }

  async findAll(options: FindManyOptions<DrawLot>): Promise<DrawLot[]> {
    return this.drawLotsRepository.find(options);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.drawLotsRepository.delete({ id });
  }
}
