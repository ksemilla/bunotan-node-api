import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DrawLotQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  public limit: number = 10;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  public skip: number = 10;
}
