import { IsEmail, IsOptional } from 'class-validator';

export class UserEmailQueryDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
