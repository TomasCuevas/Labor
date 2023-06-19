import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from '../auth/dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
export declare class AuthService {
    private readonly userRepository;
    private readonly usersService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, usersService: UsersService, jwtService: JwtService);
    register(createAuthDto: CreateUserDto): Promise<{
        token: string;
        user: User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        user: User;
    }>;
    check(user: User, rememberMe: boolean): Promise<{
        token: string;
        user: User;
    }>;
    private getJwtToken;
    private getJwtTokenWithoutExpiration;
}
