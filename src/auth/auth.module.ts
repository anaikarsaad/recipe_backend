import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
  ConfigModule,
  PassportModule.register({defaultStrategy: 'jwt'}),
  MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>{
      return{
         secret:config.get<string>('JWT_SECRET'),
         signOptions:{
          expiresIn:config.get<string | number>('JWT_EXPIRE')
         }
      }
    }
  })
],
  controllers: [AuthController],
  providers: [AuthService,UserService,JwtService,JwtStrategy],
  exports: [JwtStrategy,PassportModule],
})
export class AuthModule {}
