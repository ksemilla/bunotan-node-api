import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { DrawLot } from '../draw-lots.entity';

export class MemberQueryDto {
  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // @IsOptional()
  // public limit: number = 10;

  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // @IsOptional()
  // public skip: number = 10;

  @IsNotEmpty()
  drawLot: number;
}
