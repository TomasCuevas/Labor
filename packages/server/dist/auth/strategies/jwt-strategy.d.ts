import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../../users/entities';
import { IJwtPayload } from '../interfaces';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    private readonly configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
