// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    
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
    // const token = this.generateToken(newUser);
    // return { token };
  }

//   async login(createUserDto: CreateUserDto) {
//     const user = await this.userService.findByEmail(createUserDto.email);

//     if (!user || !(await bcrypt.compare(createUserDto.password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const token = this.generateToken(user);
//     return { token };
//   }

//   private generateToken(user: CreateUserDto | User) {
//     const payload = { sub: user.id };
//     return this.jwtService.sign(payload);
//   }
}

