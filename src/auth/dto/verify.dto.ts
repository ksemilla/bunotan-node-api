import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @IsNotEmpty()
  accessToken: string;
}
