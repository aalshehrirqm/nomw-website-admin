import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import {
  MessageStatus,
  MessageType,
  Priority,
} from '../../../../database/schemas/cms/contact-message.schema';

export class QueryContactMessageDto extends PaginationDto {
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @IsOptional()
  @IsEnum(MessageType)
  messageType?: MessageType;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
