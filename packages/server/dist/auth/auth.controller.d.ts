import { CreateUserDto } from '../users/dto';
import { LoginUserDto, CheckTokenDto } from './dto';
import { AuthService } from './auth.service';
import { User } from '../users/entities';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateUserDto): Promise<{
        token: string;
        user: User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        user: User;
    }>;
    check(user: User, checkTokenDto: CheckTokenDto): Promise<{
        token: string;
        user: User;
    }>;
}
