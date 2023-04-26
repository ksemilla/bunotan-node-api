import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyTokenDto } from './dto/verify.dto';
import { Public } from './auth.public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() signinDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }

  @Public()
  @Post('verify')
  async verify(@Body() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verifyToken(verifyTokenDto);
  }
}
