// auth.controller.ts
import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) userRegisterDto: UserRegisterDto){
    return this.authService.login(userRegisterDto);
  }
}
