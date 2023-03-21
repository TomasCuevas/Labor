import { Controller, Post, Body } from '@nestjs/common';

//* services *//
import { UsersService } from './users.service';

//* dto *//
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //! create user controller
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
