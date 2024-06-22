import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/createUserDto';
import { authDto } from './dto/authDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: createUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('signUp')
  signUp(@Body() dto: createUserDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: authDto })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('signIn')
  signIn(@Body() dto: authDto) {
    return this.authService.signIn(dto);
  }
}
