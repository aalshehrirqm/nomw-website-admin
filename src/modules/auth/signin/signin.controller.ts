import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Controller({
  path: 'signin',
  version: '1',
})
export class SigninController {
  constructor(private readonly signinService: SigninService) { }
  @Post()
  signin(@Body() body: SigninDto) {
    return this.signinService.signin(body);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto) {
    return this.signinService.refreshToken(body.refreshToken);
  }
}
