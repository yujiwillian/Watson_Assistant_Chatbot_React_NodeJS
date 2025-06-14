import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { MorganModule } from 'nest-morgan';
import { LogdnaInterceptor } from './logdna/logdna.interceptor';
import { LogdnaModule } from './logdna/logdna.module';
import { AssistantModule } from './assistant/assistant.module';
import { TeamsModule } from './teams/teams.module';
import { ChatModule } from './chat/chat.module';
import { ActionsModule } from './actions/actions.module';
import { ConfigModule } from '@nestjs/config';
import { SigsModule } from 'actions/sigs/sigs.module';
import { SnowModule } from 'actions/snow/snow.module';
@Module({
    imports: [
        MorganModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        LogdnaModule,
        AssistantModule,
        TeamsModule,
        ChatModule,
        ActionsModule,
        SigsModule,
        SnowModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LogdnaInterceptor,
        },
    ],
})
export class AppModule {}
