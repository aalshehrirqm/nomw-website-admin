import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateComplaintDto {
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
  @IsString()
  complaintType: string;

  @IsNotEmpty()
  @IsString()
  complaintText: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
