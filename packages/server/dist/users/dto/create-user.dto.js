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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe tener un formato valido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[a-zA-ZÀ-ÖØ-öø-ſ]+([ '-][a-zA-ZÀ-ÖØ-öø-ſ]+)*$/, {
        message: 'El nombre solo puede contener letras y espacios, guiones o apóstrofes entre los nombres.',
    }),
    (0, class_validator_1.MinLength)(1, { message: 'El nombre debe tener mínimo 1 careacter.' }),
    (0, class_validator_1.MaxLength)(46, { message: 'El nombre debe tener maximo 46 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'La contraseña debe tener maximo 50 caracteres.' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])/, {
        message: 'La contraseña debe tener al menos una mayuscula.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*\d)/, {
        message: 'La contraseña debe tener al menos un numero.',
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\-\.]+$/, {
        message: 'La contraseña solo puede tener letras, numeros, guiones y puntos.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: 'La propiedad "rememberMe" debe ser un valor booleano.',
    }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "rememberMe", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map