import { IsNotEmpty, IsOptional } from 'class-validator';
import { DrawLot } from '../draw-lots.entity';

export class UpdateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;
}
