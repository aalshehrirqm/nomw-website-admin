import { IsOptional, IsString, IsEnum } from 'class-validator';
import {
  MessageStatus,
  Priority,
} from '../../../../database/schemas/cms/contact-message.schema';

export class UpdateContactMessageDto {
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @IsOptional()
  @IsString()
  response?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
