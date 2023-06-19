"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const entities_1 = require("../users/entities");
let AuthService = class AuthService {
    constructor(userRepository, usersService, jwtService) {
        this.userRepository = userRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(createAuthDto) {
        const user = await this.usersService.create(createAuthDto);
        const { rememberMe } = createAuthDto;
        return {
            token: rememberMe
                ? this.getJwtTokenWithoutExpiration({ id: user.id })
                : this.getJwtToken({ id: user.id }),
            user,
        };
    }
    async login(loginUserDto) {
        const { email, password, rememberMe } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, name: true, password: true, id: true },
        });
        if (!user || !bcryptjs.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException([
                'El correo electrónico o contraseña ingresado es incorrecto',
            ]);
        }
        delete user.password;
        return {
            token: rememberMe
                ? this.getJwtTokenWithoutExpiration({ id: user.id })
                : this.getJwtToken({ id: user.id }),
            user,
        };
    }
    async check(user, rememberMe) {
        return {
            token: rememberMe
                ? this.getJwtTokenWithoutExpiration({ id: user.id })
                : this.getJwtToken({ id: user.id }),
            user,
        };
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    getJwtTokenWithoutExpiration(payload) {
        const token = this.jwtService.sign(payload, { expiresIn: '60d' });
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map