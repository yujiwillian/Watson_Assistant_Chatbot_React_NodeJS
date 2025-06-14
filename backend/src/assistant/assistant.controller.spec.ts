import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { SessionGuard } from './guards/session.guard';
import { CreateSession, DeleteSession, Message } from './interfaces';

describe('AssistantController', () => {
    let controller: AssistantController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AssistantController, SessionGuard],
            imports: [HttpModule],
            providers: [
                {
                    provide: AssistantService,
                    useFactory: () => ({
                        async generateNewSession() {
                            const session: CreateSession = {
                                message: 'Session created',
                                session_id:
                                    '0704aa99-0cfa-4b14-9f85-567277ccc342',
                            };

                            return session;
                        },
                        async deleteSession() {
                            const deletedSession: DeleteSession = {
                                message: 'Session was deleted successfully',
                            };

                            return deletedSession;
                        },
                        async sendMessage() {
                            const responseMessage: Message = {
                                generic: [
                                    {
                                        response_type: 'text',
                                        text: 'test message',
                                    },
                                ],
                            };

                            return responseMessage;
                        },
                    }),
                },
            ],
        }).compile();

        controller = module.get<AssistantController>(AssistantController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
