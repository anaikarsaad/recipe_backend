import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserModel }])], // Ensure UserModel is correctly registered
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
