import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActionsModule } from 'actions/actions.module';
import { ActionsService } from 'actions/actions.service';
import { SigsModule } from 'actions/sigs/sigs.module';
import { SnowModule } from 'actions/snow/snow.module';
import { AssistantModule } from 'assistant/assistant.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeService } from 'utils/type.service';
import { LoggerService } from 'utils/logger.service';

@Module({
    controllers: [ChatController],
    imports: [AssistantModule, ActionsModule, SigsModule, SnowModule],
    providers: [ChatService, ActionsService, TypeService, LoggerService],
})
export class ChatModule {}
