import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ActionsModule } from 'actions/actions.module';
import { ActionsService } from 'actions/actions.service';
import { SigsService } from 'actions/sigs/sigs.service';
import { AssistantModule } from 'assistant/assistant.module';
import { AssistantService } from 'assistant/assistant.service';
import { ChatService } from './chat.service';

describe('ChatService', () => {
    let service: ChatService;
    let assistantService: AssistantService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChatService, ActionsService, SigsService],
            imports: [AssistantModule, HttpModule, ConfigModule.forRoot()],
        }).compile();
        service = module.get<ChatService>(ChatService);
        assistantService = module.get<AssistantService>(AssistantService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('preparePayload', () => {
        const results = service.preparePayload([
            {
                response_type: 'text',
                text: 'testing',
            },
            {
                response_type: 'options',
                title: 'dropdown',
                options: [
                    { label: '1', value: { input: { text: '1' } } },
                    { label: '2', value: { input: { text: '2' } } },
                    { label: '3', value: { input: { text: '3' } } },
                ],
            },
            {
                response_type: 'image',
                title: 'video',
                source: '1234567',
            },
            {
                response_type: 'image',
                title: 'image',
                source: '1234567',
                description: 'imageDesc',
            },
        ]);
        expect(results).toEqual([
            {
                type: 'text',
                text: 'testing',
            },
            {
                dropdown: true,
                type: 'options',
                options: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                ],
            },
            {
                type: 'video',
                url: '1234567',
            },
            {
                type: 'image',
                url: '1234567',
                alt: 'imageDesc',
            },
        ]);
    });

    it('run without actions', async () => {
        assistantService.generateNewSession = jest.fn().mockReturnValue({
            data: {
                session_id: '123456789',
                message: '',
            },
        });
        assistantService.sendMessage = jest.fn().mockReturnValue({
            data: {
                generic: [
                    {
                        response_type: 'text',
                        text: 'testing',
                    },
                ],
                //Parece que sempre vem com o skillContext
                skillsContext: {},
            },
        });
        const result = await service.run('', 'conversation_start', 'web');
        expect(assistantService.generateNewSession).toBeCalled();
        expect(assistantService.sendMessage).toBeCalled();

        expect(result).toEqual({
            messages: [
                {
                    type: 'text',
                    text: 'testing',
                },
            ],
            chatId: '123456789',
        });
    });

    it('run with skillsContext but without actions', async () => {
        assistantService.generateNewSession = jest.fn().mockReturnValue({
            data: {
                session_id: '123456789',
                message: '',
            },
        });
        assistantService.sendMessage = jest.fn().mockReturnValue({
            data: {
                generic: [
                    {
                        response_type: 'text',
                        text: 'testing',
                    },
                ],
                skillsContext: {},
            },
        });

        expect(async () => {
            await service.run('1234567', 'ola', 'web');
        }).rejects.toThrowError(
            new BadRequestException(
                'skillsContext exists but actions are not defined',
            ),
        );
        expect(assistantService.generateNewSession).toBeCalledTimes(0);
        expect(assistantService.sendMessage).toBeCalled();
    });
});
