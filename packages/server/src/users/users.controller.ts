import { Controller, Post, Body } from '@nestjs/common';

//* services *//
import { UsersService } from './users.service';

//* dto *//
import { CreateUserDto } from './dto';

//* entities *//
import { User } from './entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //! create user controller
  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
