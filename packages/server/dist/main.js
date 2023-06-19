"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const corsConfigs = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('/api');
    app.enableCors(corsConfigs);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map