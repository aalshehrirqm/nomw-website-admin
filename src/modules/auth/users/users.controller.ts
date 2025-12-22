import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { UserIdDto } from '../dtos/user-id.dto';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AllowedTo } from '../decorators/roles.decorator';
import { UserRole } from 'src/database/schemas/user.schema';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Create user - Admin only
  @Post()
  @AllowedTo(UserRole.ADMIN)
  createUser(@Body() body: UserDto) {
    return this.usersService.createUser(body);
  }

  // Get current user's profile - Available to all authenticated users
  @Get('me/profile')
  getMyProfile(@GetUser('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  // Update current user's profile - Available to all authenticated users
  @Patch('me/profile')
  updateMyProfile(
    @GetUser('userId') userId: string,
    @Body() body: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, body);
  }

  // Change current user's password - Available to all authenticated users
  @Patch('me/password')
  changeMyPassword(
    @GetUser('userId') userId: string,
    @Body() body: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, body);
  }

  // Get all users with pagination and filtering - Admin only
  // Usage: GET /users?page=1&limit=10&search=john&role=admin
  @Get()
  @AllowedTo(UserRole.ADMIN)
  getUsers(@Query() query: UserQueryDto) {
    return this.usersService.getAllUsers(query);
  }

  // Get user by ID - Admin only
  @Get(':id')
  @AllowedTo(UserRole.ADMIN)
  getUserById(@Param() params: UserIdDto) {
    return this.usersService.getUserById(params.id);
  }

  // Update user - Admin only
  @Put(':id')
  @AllowedTo(UserRole.ADMIN)
  updateUser(@Param() params: UserIdDto, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(params.id, body);
  }

  // Delete user - Admin only
  @Delete(':id')
  @AllowedTo(UserRole.ADMIN)
  deleteUser(@Param() params: UserIdDto) {
    return this.usersService.deleteUser(params.id);
  }
}
