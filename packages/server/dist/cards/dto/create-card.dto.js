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
exports.CreateCardDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCardDto {
}
__decorate([
    (0, class_validator_1.Matches)(/^(?!\s)[\s\S]*(?<!\s)$/, {
        message: 'El nombre de la tarjeta, no puede tener espacios al principio ni al final.',
    }),
    (0, class_validator_1.MinLength)(1, {
        message: 'El nombre de la tarjeta debe tener mínimo 1 carácter.',
    }),
    (0, class_validator_1.MaxLength)(50, {
        message: 'El nombre de la tarjeta debe tener máximo 50 caracteres.',
    }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['pending', 'in-progress', 'completed'], {
        message: 'El (status) enviado, no es un status valido.',
    }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: 'El ID ingresado, debe ser un UUID valido.' }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "boardId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripcion debe ser un texto.' }),
    (0, class_validator_1.MaxLength)(300, {
        message: 'La descripción debe tener máximo 300 carácteres.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'El campo debe ser un array de strings.' }),
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Cada elemento del array debe ser una cadena de caracteres.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCardDto.prototype, "labels", void 0);
exports.CreateCardDto = CreateCardDto;
//# sourceMappingURL=create-card.dto.js.map