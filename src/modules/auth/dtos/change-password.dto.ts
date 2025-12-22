import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
} from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(6)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirmPassword: string;
}
