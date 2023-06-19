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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const boards_service_1 = require("../boards/boards.service");
const entities_1 = require("../cards/entities");
let CardsService = class CardsService {
    constructor(CardsRepository, boardsService) {
        this.CardsRepository = CardsRepository;
        this.boardsService = boardsService;
    }
    async create(createCardDto, createBy) {
        const { boardId } = createCardDto, rest = __rest(createCardDto, ["boardId"]);
        const board = await this.boardsService.findOneById(boardId, createBy.id);
        if (!board) {
            throw new common_1.BadRequestException([
                'El tablero en el que intenta agregar la tarjeta, no existe.',
            ]);
        }
        const card = await this.CardsRepository.create(Object.assign(Object.assign({}, rest), { board: { id: boardId }, user: createBy }));
        return await this.CardsRepository.save(card);
    }
    async findAllByBoard(boardId, userId) {
        return await this.CardsRepository.findBy({
            board: { id: boardId, user: { id: userId } },
            user: { id: userId },
        });
    }
    async findAllBySearch(search, userId) {
        return this.CardsRepository.createQueryBuilder('card')
            .innerJoinAndSelect('card.board', 'board')
            .innerJoinAndSelect('card.user', 'user')
            .where('card.userId = :userId', { userId })
            .andWhere('LOWER(card.title) like :title', {
            title: `%${search.toLowerCase()}%`,
        })
            .getMany();
    }
    async findOne(id, userId) {
        const card = await this.CardsRepository.findOneBy({
            id,
            user: { id: userId },
        });
        if (!card) {
            throw new common_1.NotFoundException(`Todo con el id: ${id} no fue encontrado.`);
        }
        return card;
    }
    async update(id, updateCardDto, userId) {
        await this.findOne(id, userId);
        const { boardId } = updateCardDto, rest = __rest(updateCardDto, ["boardId"]);
        const card = await this.CardsRepository.preload(Object.assign(Object.assign({}, rest), { id }));
        return await this.CardsRepository.save(card);
    }
    async remove(id, userId) {
        const card = await this.findOne(id, userId);
        await this.CardsRepository.remove(card);
        return;
    }
};
CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        boards_service_1.BoardsService])
], CardsService);
exports.CardsService = CardsService;
//# sourceMappingURL=cards.service.js.map