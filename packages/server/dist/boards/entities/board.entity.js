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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../cards/entities");
const entities_2 = require("../../users/entities");
let Board = class Board {
    updateLastUpdate() {
        this.lastUpdate = new Date().getTime();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.User, (user) => user.id, { eager: true }),
    __metadata("design:type", entities_2.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Card, (todo) => todo.id),
    __metadata("design:type", Array)
], Board.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'lightblue',
    }),
    __metadata("design:type", String)
], Board.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'open',
    }),
    __metadata("design:type", String)
], Board.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'numeric',
        default: new Date().getTime(),
    }),
    __metadata("design:type", Number)
], Board.prototype, "lastUpdate", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Board.prototype, "updateLastUpdate", null);
Board = __decorate([
    (0, typeorm_1.Entity)('boards')
], Board);
exports.Board = Board;
//# sourceMappingURL=board.entity.js.map