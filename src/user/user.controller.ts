import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    @Get()
    getUser(){
        return "user returned"
    }

    @Get(':id')
    getOneUser(@Param() id: string){
        return id
    }
}
