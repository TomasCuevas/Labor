import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

//* dto *//
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from '../auth/dto';

//* interfaces *//
import { IJwtPayload } from './interfaces';

//* services *//
import { UsersService } from '../users/users.service';

//* entities *//
import { User } from '../users/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //! register service
  async register(createAuthDto: CreateUserDto) {
    const user = await this.usersService.create(createAuthDto);

    const { rememberMe } = createAuthDto;

    return {
      token: rememberMe
        ? this.getJwtTokenWithoutExpiration({ id: user.id })
        : this.getJwtToken({ id: user.id }),
      user,
    };
  }

  //! login service
  async login(loginUserDto: LoginUserDto) {
    const { email, password, rememberMe } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, name: true, password: true, id: true },
    });

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException([
        'El correo electrónico o contraseña ingresado es incorrecto',
      ]);
    }

    delete user.password;

    return {
      token: rememberMe
        ? this.getJwtTokenWithoutExpiration({ id: user.id })
        : this.getJwtToken({ id: user.id }),
      user,
    };
  }

  //! check service
  async check(user: User, rememberMe: boolean) {
    return {
      token: rememberMe
        ? this.getJwtTokenWithoutExpiration({ id: user.id })
        : this.getJwtToken({ id: user.id }),
      user,
    };
  }

  //! get jwt with expiration
  private getJwtToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  //! get jwt without expiration
  private getJwtTokenWithoutExpiration(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload, { expiresIn: '60d' });
    return token;
  }
}
