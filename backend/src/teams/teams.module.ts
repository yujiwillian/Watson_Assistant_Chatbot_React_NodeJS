import { Module } from '@nestjs/common';
import { AssistantModule } from 'assistant/assistant.module';
import { ConversationState, MemoryStorage } from 'botbuilder-core';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
    controllers: [TeamsController],
    imports: [AssistantModule],
    providers: [
        TeamsService,
        {
            provide: 'ConversationState',
            useFactory: () => {
                const memoryStorage = new MemoryStorage();
                const conversationState = new ConversationState(memoryStorage);

                return conversationState;
            },
        },
    ],
})
export class TeamsModule {}
