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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const pipes_1 = require("@nestjs/common/pipes");
const passport_1 = require("@nestjs/passport");
const decorators_1 = require("../auth/decorators");
const boards_service_1 = require("../boards/boards.service");
const cards_service_1 = require("../cards/cards.service");
const dto_1 = require("./dto");
const entities_1 = require("../users/entities");
let BoardsController = class BoardsController {
    constructor(boardsService, cardsService) {
        this.boardsService = boardsService;
        this.cardsService = cardsService;
    }
    async create(createBoardDto, user) {
        return await this.boardsService.create(createBoardDto, user);
    }
    async findAllOpenBoards(user) {
        return this.boardsService.findAllOpenBoards(user.id);
    }
    async findOne(name, user) {
        return await this.boardsService.findOneByName(name, user.id);
    }
    async findAllClosedBoards(user) {
        return this.boardsService.findAllClosedBoards(user.id);
    }
    async findAllTodos(boardId, user) {
        return await this.cardsService.findAllByBoard(boardId, user.id);
    }
    async update(id, updateBoardDto, user) {
        return await this.boardsService.update(id, updateBoardDto, user);
    }
    async delete(id, user) {
        return await this.boardsService.delete(id, user);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBoardDto,
        entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all/open'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAllOpenBoards", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('all/closed'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAllClosedBoards", null);
__decorate([
    (0, common_1.Get)(':boardId/cards'),
    __param(0, (0, common_1.Param)('boardId', pipes_1.ParseUUIDPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAllTodos", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBoardDto,
        entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "delete", null);
BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [boards_service_1.BoardsService,
        cards_service_1.CardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map