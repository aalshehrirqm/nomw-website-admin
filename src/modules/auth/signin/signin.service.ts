import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { HashUtil } from 'src/common/utils/hash.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  signin = async (body: SigninDto) => {
    const { email, password } = body;

    // Find user by email (include password for verification)
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password using bcrypt
    const isPasswordValid = await HashUtil.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Generate JWT tokens
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      message: 'Sign in successful',
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  };

  refreshToken = async (token: string) => {
    try {
      const payload = this.jwtService.verify(token);

      // We could check if user still exists here if we wanted to be strict
      // const user = await this.userModel.findById(payload.userId);
      // if (!user) throw new UnauthorizedException('User not found');

      const newPayload = {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };

      const accessToken = this.jwtService.sign(newPayload);
      const refreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
      });

      return {
        message: 'Token refresh successful',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  };
}
