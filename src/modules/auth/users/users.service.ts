import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { UserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { HashUtil } from 'src/common/utils/hash.util';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  // Create user
  createUser = async (body: UserDto) => {
    // Check if user already exists
    const isExist = await this.userModel.findOne({ email: body.email });

    if (isExist) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password before saving
    body.password = await HashUtil.hash(body.password);

    // Create new user with hashed password
    const user = await this.userModel.create(body);

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  };

  // Get all users with pagination and filtering
  getAllUsers = async (query: {
    search?: string;
    role?: string;
    page?: number;
    limit?: number;
  }) => {
    const { search, role, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    // Execute query with pagination
    const [users, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };

  // Get user by ID
  getUserById = async (id: string) => {
    const user = await this.userModel.findById(id).select('-password').exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  };

  // Get user by email
  getUserByEmail = async (email: string) => {
    const user = await this.userModel
      .findOne({ email })
      .select('-password')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  };

  // Update user
  updateUser = async (id: string, body: UpdateUserDto) => {
    // If password is being updated, hash it
    if (body?.password) {
      body.password = await HashUtil.hash(body.password);
    }

    // If email is being updated, check for duplicates
    if (body?.email) {
      const existingUser = await this.userModel.findOne({
        email: body.email,
        _id: { $ne: id },
      });

      if (existingUser) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, body, { new: true })
      .select('-password')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  };
  // Delete user
  deleteUser = async (id: string) => {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: 'User deleted successfully', id };
  };

  // Update user's own profile (name and email only)
  updateProfile = async (userId: string, body: UpdateProfileDto) => {
    // If email is being updated, check for duplicates
    if (body?.email) {
      const existingUser = await this.userModel.findOne({
        email: body.email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, body, { new: true })
      .select('-password')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  };

  // Change user's password
  changePassword = async (userId: string, body: ChangePasswordDto) => {
    // Validate that new password and confirm password match
    if (body.newPassword !== body.confirmPassword) {
      throw new ConflictException('New password and confirm password do not match');
    }

    // Get user with password for verification
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verify current password
    const isPasswordValid = await HashUtil.compare(
      body.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await HashUtil.hash(body.newPassword);

    // Update password
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true },
      )
      .select('-password')
      .exec();

    return {
      message: 'Password changed successfully',
      user: updatedUser,
    };
  };
}
