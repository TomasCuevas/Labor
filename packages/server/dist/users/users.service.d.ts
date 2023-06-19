import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entities';
export declare class UsersService {
    private readonly UserRepository;
    constructor(UserRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
