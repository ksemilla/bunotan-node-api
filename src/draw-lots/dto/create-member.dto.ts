import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/users.entity';
import { DrawLot } from '../draw-lots.entity';

export class CreateMemberDto {
  @IsNotEmpty()
  drawLot: DrawLot;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string | null | '';
}
