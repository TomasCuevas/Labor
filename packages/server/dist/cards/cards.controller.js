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
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const cards_service_1 = require("./cards.service");
const dto_1 = require("./dto");
const decorators_1 = require("../auth/decorators");
const entities_1 = require("../users/entities");
let CardsController = class CardsController {
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    async create(createCardDto, user) {
        return this.cardsService.create(createCardDto, user);
    }
    async findOne(id, user) {
        return this.cardsService.findOne(id, user.id);
    }
    async update(id, updateCardDto, user) {
        return this.cardsService.update(id, updateCardDto, user.id);
    }
    async remove(id, user) {
        return this.cardsService.remove(id, user.id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCardDto,
        entities_1.User]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCardDto,
        entities_1.User]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
CardsController = __decorate([
    (0, common_1.Controller)('cards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
exports.CardsController = CardsController;
//# sourceMappingURL=cards.controller.js.map