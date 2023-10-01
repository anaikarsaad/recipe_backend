// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService 
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Check if the user already exists (by email)
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Create and save the new user
    const newUser = await this.userService.create(createUserDto);

    // Generate and return a JWT token
    const token = this.jwtService.sign({id: newUser._id},{secret:process.env.JWT_SECRET});
    return { token };
  }

  async login(createUserDto: UserRegisterDto) {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (!user || !(await bcrypt.compare(createUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({id: user._id},{secret:process.env.JWT_SECRET});
    return { token };
  }

  // private generateToken(user: CreateUserDto | User) {
  //   const payload = { sub: user.email, username: user.username };
  //   return this.jwtService.sign(payload,{secret:"I love Myself"});
  // }
}

