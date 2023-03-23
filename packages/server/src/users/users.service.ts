import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

//* dto *//
import { CreateUserDto } from './dto';

//* entities *//
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //! create user service
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const existUser = await this.findByEmail(userData.email);
    if (existUser) {
      throw new BadRequestException([
        'El correo electrónico ingresado, ya se encuentra registrado.',
      ]);
    }

    const user = await this.userRepository.create({
      ...userData,
      password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
    });
    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  //! find user by email service
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
