import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Post()
  async login(@Body() signinDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }
}
