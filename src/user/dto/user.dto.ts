import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  readonly username: string;


  readonly email: string;

 
  readonly phoneNumber:number;
  
  readonly password: string;
}
