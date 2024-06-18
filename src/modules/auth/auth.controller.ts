import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthDto } from './dto/AuthDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUP(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
