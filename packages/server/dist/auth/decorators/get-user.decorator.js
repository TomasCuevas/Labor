"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((field, context) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
        throw new common_1.InternalServerErrorException('Usuario no encontrado. Contacte con un administrador.');
    }
    return field ? user[field] : user;
});
//# sourceMappingURL=get-user.decorator.js.map