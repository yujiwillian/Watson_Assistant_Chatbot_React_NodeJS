/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistantModule } from 'assistant/assistant.module';
import { AssistantService } from 'assistant/assistant.service';
import { ConversationState, MemoryStorage, TurnContext } from 'botbuilder-core';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
    let service: TeamsService;
    let assistantService: AssistantService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
            imports: [AssistantModule, ConfigModule.forRoot()],
        }).compile();

        assistantService = module.get<AssistantService>(AssistantService);
        assistantService.generateNewSession = jest.fn().mockReturnValue({
            data: {
                session_id: '123456789',
                message: '',
            },
        });

        service = module.get<TeamsService>(TeamsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
