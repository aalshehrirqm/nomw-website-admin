import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  EDITOR = 'editor',
}

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;

  @Prop({ type: Date, default: null })
  lastLogoutAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
