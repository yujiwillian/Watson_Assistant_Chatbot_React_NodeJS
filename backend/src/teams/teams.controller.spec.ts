import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConversationState, MemoryStorage } from 'botbuilder-core';
import { AssistantModule } from 'assistant/assistant.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

describe('TeamsController', () => {
    let controller: TeamsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeamsController],
            providers: [
                TeamsService,
                {
                    provide: 'ConversationState',
                    useFactory: () => {
                        const memoryStorage = new MemoryStorage();
                        const conversationState = new ConversationState(
                            memoryStorage,
                        );

                        return conversationState;
                    },
                },
            ],
            imports: [ConfigModule.forRoot(), AssistantModule],
        }).compile();

        controller = module.get<TeamsController>(TeamsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
