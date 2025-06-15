"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const loggerLevelString = process.env.LOGGER_LEVEL;
    const loggerLevel = loggerLevelString.replace(/'/g, '"');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: JSON.parse(loggerLevel),
    });
    app.setGlobalPrefix('/api/v1');
    app.enableCors({
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 204,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Orchestrator')
        .setVersion('1.0')
        .addTag('assistant')
        .addTag('teams')
        .addBearerAuth({
        name: 'sessionid',
        scheme: 'bearer',
        type: 'apiKey',
        in: 'header',
    }, 'sessionid')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(Number(process.env.PORT) || 3030, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map