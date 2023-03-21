import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* dto *//
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';

//* decorators *//
import { GetUser } from './decorators';

//* services *//
import { AuthService } from './auth.service';

//* entities *//
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //! register controller
  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }

  //! signin controller
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  //! revalidate controller
  @Get('revalidate')
  @UseGuards(AuthGuard('jwt'))
  async revalidate(@GetUser() user: User) {
    return this.authService.revalidate(user);
  }
}
