import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export type UserDocument = User & Document;
@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({required:true,unique:true})
  phoneNumber:string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;
}

export const UserModel = SchemaFactory.createForClass(User);