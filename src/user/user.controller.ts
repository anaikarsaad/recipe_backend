import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
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
