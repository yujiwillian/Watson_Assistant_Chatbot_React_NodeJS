import {
    HttpException,
    InternalServerErrorException,
    Module,
    OnModuleInit,
} from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';
import { AxiosResponse } from 'axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionGuard } from './guards/session.guard';
import { LogdnaService } from 'logdna/logdna.service';
import { Logger } from '@nestjs/common';

@Module({
    providers: [AssistantService, SessionGuard],
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const env = process.env.NODE_ENV //APENAS PARA NESTJS
                Logger.log('NODE_ENV: ',env); //Printado variável para check de ambiente 
                const assistantId = env === 'homologation' //SE igual homologation
                    ? configService.get('ASSISTANT_ID_DEV') //ENTÃO vai para ASSISTANT_ID_DEV
                    : configService.get('ASSISTANT_ID');   //SENÃO ASSISTANT_ID
                Logger.log('ASSISTANT ID: ',assistantId); //Printado variável para check de ambiente 
                return {
                    baseURL: configService.get('ASSISTANT_API'),
                    headers: {
                        assistantId: assistantId
                            .replace(/(\\r\\n|\\n|\\r)/gm, '')
                            .replace(/[^a-z0-9 ,._/:-]/gi, '')
                            .trim(),
                        token:
                            'Bearer ' +
                            configService
                                .get('WATSON_API_KEY')
                                .replace(/(\\r\\n|\\n|\\r)/gm, '')
                                .replace(/[^a-z0-9 ,._/:-]/gi, '')
                                .trim(),
                        assistantUrl: configService
                            .get('WATSON_API_URL')
                            .replace(/(\\r\\n|\\n|\\r)/gm, '')
                            .replace(/[^a-z0-9 ,._/:-]/gi, '')
                            .trim(),
                    },
                };
            },
        }),
    ],
    controllers: [AssistantController],
    exports: [AssistantService],

})
export class AssistantModule {}