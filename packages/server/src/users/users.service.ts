import { Injectable } from '@nestjs/common';
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

    const user = await this.userRepository.create({
      ...userData,
      password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
    });
    await this.userRepository.save(user);

    delete user.password;

    return user;
  }
}
