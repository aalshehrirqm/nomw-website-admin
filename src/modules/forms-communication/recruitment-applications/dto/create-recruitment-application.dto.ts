import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateRecruitmentApplicationDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  cvFileUrl: string;

  @IsNotEmpty()
  @IsString()
  cvFileName: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  experience?: number;
}
