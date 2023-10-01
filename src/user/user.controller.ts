import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('User')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    getUser(){
        return "user returned"
    }
    
    @Get(':id')
    @UseGuards(AuthGuard())
    getOneUser(@Param() id: string){
        return this.userService.findById(id);
    }
}
