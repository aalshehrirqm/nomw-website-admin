import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import {
  MessageType,
  Priority,
} from '../../../../database/schemas/cms/contact-message.schema';

export class CreateContactMessageDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(MessageType)
  messageType: MessageType;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
