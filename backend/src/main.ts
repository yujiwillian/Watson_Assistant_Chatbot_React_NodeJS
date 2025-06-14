import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LogdnaService } from './logdna/logdna.service';
import { Logger, LogLevel } from '@nestjs/common';
async function bootstrap() {
    const loggerLevelString = process.env.LOGGER_LEVEL;
    const loggerLevel = loggerLevelString.replace(/'/g, '"');
    const app = await NestFactory.create(AppModule, {
        logger: JSON.parse(loggerLevel),
    });
    // app.useLogger(app.get(LogdnaService));
    app.setGlobalPrefix('/api/v1');
    app.enableCors({
       // origin: process.env.CORS_ENABLED_ORIGIN,
       // origin: [
       //     'https://chatbot.net',
       //     'https://chatbot.net',
       //     'http://localhost:3000',
       // ],
        //for development
        // origin: ['*://localhost:*/*'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 204,
    });

    const config = new DocumentBuilder()
        .setTitle('Orchestrator')
        .setVersion('1.0')
        .addTag('assistant')
        .addTag('teams')
        .addBearerAuth(
            {
                name: 'sessionid',
                scheme: 'bearer',
                type: 'apiKey',
                in: 'header',
            },
            'sessionid',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(Number(process.env.PORT) || 3030, '0.0.0.0');
}
bootstrap();
