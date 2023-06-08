import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

//* dto *//
import { CreateUserDto } from '@/users/dto';

//* entities *//
import { User } from '@/users/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}

  //! create user service
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, rememberMe, ...userData } = createUserDto;

    const existUser = await this.findByEmail(userData.email);
    if (existUser) {
      throw new BadRequestException([
        'El correo electrónico ingresado, ya se encuentra registrado.',
      ]);
    }

    const user = await this.UserRepository.create({
      ...userData,
      password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
    });
    await this.UserRepository.save(user);

    delete user.password;

    return user;
  }

  //! find user by email service
  async findByEmail(email: string) {
    return await this.UserRepository.findOneBy({ email });
  }
}
