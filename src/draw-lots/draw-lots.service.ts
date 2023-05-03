import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { DrawLot } from './draw-lots.entity';
import { CreateDrawLotDto } from './dto/create-draw-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllResult } from 'src/interfaces';
import { UpdateDrawLotDto } from './dto/update-draw-lot.dto';

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

  async findAll(
    options: FindManyOptions<DrawLot>,
  ): Promise<FindAllResult<DrawLot>> {
    const [data, count] = await this.drawLotsRepository.findAndCount(options);
    return { list: data, count };
  }

  async findOne(options: FindOneOptions<DrawLot>): Promise<DrawLot> {
    return await this.drawLotsRepository.findOne(options);
  }

  async update(
    id: number,
    drawLotDto: UpdateDrawLotDto,
  ): Promise<UpdateResult> {
    return this.drawLotsRepository.update(
      {
        id,
      },
      {
        name: drawLotDto.name,
      },
    );
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.drawLotsRepository.delete({ id });
  }
}
