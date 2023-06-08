import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* dto *//
import { CreateUserDto } from '../users/dto';
import { LoginUserDto, CheckTokenDto } from './dto';

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

  //! check controller
  @Post('check')
  @UseGuards(AuthGuard('jwt'))
  async check(@GetUser() user: User, @Body() checkTokenDto: CheckTokenDto) {
    return this.authService.check(user, checkTokenDto.rememberMe);
  }
}
