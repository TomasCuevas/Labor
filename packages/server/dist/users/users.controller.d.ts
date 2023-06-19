import { UsersService } from './users.service';
import { CreateUserDto } from './/dto';
import { User } from './entities';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
}
