import { Body, Controller, Post } from '@nestjs/common';
import { AuthLiginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-regiter.dto';
import { AuthLForgetDTO } from './dto/auth-forget.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLiginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthLForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }
}
