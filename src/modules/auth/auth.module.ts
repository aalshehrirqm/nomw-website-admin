import { Module } from '@nestjs/common';
import { SigninController } from './signin/signin.controller';
import { SigninService } from './signin/signin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/schemas/user.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [SigninController, UsersController],
  providers: [SigninService, UsersService, JwtAuthGuard, RolesGuard],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') || 'default-secret-change-me',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  exports: [JwtModule, JwtAuthGuard, RolesGuard, UsersService],
})
export class AuthModule {}
