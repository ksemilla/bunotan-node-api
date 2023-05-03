import { IsNotEmpty } from 'class-validator';

export class UpdateDrawLotDto {
  @IsNotEmpty()
  name: string;
}
