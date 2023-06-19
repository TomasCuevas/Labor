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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../boards/entities");
const entities_2 = require("../cards/entities");
let BoardsService = class BoardsService {
    constructor(BoardsRepository, CardsRepository) {
        this.BoardsRepository = BoardsRepository;
        this.CardsRepository = CardsRepository;
    }
    async create(createBoardDto, createBy) {
        const existBoard = await this.BoardsRepository.findBy({
            name: createBoardDto.name,
            user: { id: createBy.id },
        });
        if (existBoard) {
            throw new common_1.ConflictException('No se puede crear el tablero. Ya existe otro tablero con el mismo nombre.');
        }
        const newBoard = await this.BoardsRepository.create(Object.assign(Object.assign({}, createBoardDto), { user: createBy }));
        return await this.BoardsRepository.save(newBoard);
    }
    async findAllOpenBoards(userId) {
        return await this.BoardsRepository.findBy({
            user: { id: userId },
            status: 'open',
        });
    }
    async findAllBySearch(search, userId) {
        return this.BoardsRepository.createQueryBuilder('board')
            .innerJoinAndSelect('board.user', 'user')
            .where('board.userId = :userId', { userId })
            .andWhere('LOWER(board.name) like :name', {
            name: `%${search.toLowerCase()}%`,
        })
            .getMany();
    }
    async findOneById(boardId, userId) {
        return await this.BoardsRepository.findOneBy({
            id: boardId,
            user: { id: userId },
        });
    }
    async findOneByName(name, userId) {
        return await this.BoardsRepository.findOneBy({
            user: { id: userId },
            name: name,
        });
    }
    async findAllClosedBoards(userId) {
        return await this.BoardsRepository.findBy({
            user: { id: userId },
            status: 'closed',
        });
    }
    async update(boardId, updateBoardDto, updateBy) {
        const existBoard = await this.BoardsRepository.findBy({
            name: updateBoardDto.name,
            user: { id: updateBy.id },
        });
        if (existBoard) {
            throw new common_1.ConflictException('No se puede crear el tablero. Ya existe otro tablero con el mismo nombre.');
        }
        await this.findOneById(boardId, updateBy.id);
        const board = await this.BoardsRepository.preload(Object.assign(Object.assign({}, updateBoardDto), { id: boardId }));
        return await this.BoardsRepository.save(Object.assign(Object.assign({}, board), { user: updateBy }));
    }
    async delete(boardId, deleteBy) {
        await this.CardsRepository.delete({
            board: { id: boardId },
            user: { id: deleteBy.id },
        });
        const board = await this.findOneById(boardId, deleteBy.id);
        await this.BoardsRepository.remove(board);
        return;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map