import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { AssistantService } from './assistant.service';

describe('AssistantService', () => {
    let service: AssistantService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssistantService],
            imports: [
                HttpModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        baseURL: configService.get('ASSISTANT_API'),
                        headers: {
                            assistantId: configService.get('ASSISTANT_ID'),
                            token: `Bearer ${configService.get(
                                'WATSON_API_KEY',
                            )}`,
                        },
                    }),
                }),
            ],
        }).compile();

        service = module.get<AssistantService>(AssistantService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('generateNewSession', async () => {
        const response: AxiosResponse<any> = {
            headers: {},
            status: 200,
            statusText: 'OK',
            data: {
                session_id: '123456',
                message: '',
            },
            config: undefined,
        };
        jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
            of(response),
        );
        const result = await service.generateNewSession();
        expect(result.data).toEqual({
            session_id: '123456',
            message: '',
        });
    });
    it('generateNewSession-error', async () => {
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
            throw new Error('Error');
        });
        const result = await service.generateNewSession();
        expect(result.data).toEqual({
            session_id: null,
            message: 'Erro ao criar a sessão',
        });
    });

    it('deleteSession', async () => {
        const response: AxiosResponse<any> = {
            headers: {},
            status: 200,
            statusText: 'OK',
            data: {
                message: 'deleted',
            },
            config: undefined,
        };
        jest.spyOn(httpService, 'delete').mockImplementationOnce(() =>
            of(response),
        );
        const result = await service.deleteSession();
        expect(result.data).toEqual({
            message: 'deleted',
        });
    });

    it('deleteSession-error', async () => {
        jest.spyOn(httpService, 'delete').mockImplementationOnce(() => {
            throw new Error('Error');
        });
        const result = await service.deleteSession();
        expect(result.data).toEqual({
            message: 'Erro ao deletar a sessão',
        });
    });

    it('sendMessage', async () => {
        const response: AxiosResponse<any> = {
            headers: {},
            status: 200,
            statusText: 'OK',
            data: {
                generic: [{ response_type: 'text', text: 'teste' }],
                user_defined: {},
            },
            config: undefined,
        };
        jest.spyOn(httpService, 'post').mockImplementationOnce(() =>
            of(response),
        );
        const result = await service.sendMessage(
            'conversation_start',
            '1234567',
        );
        expect(result.data).toEqual({
            generic: [{ response_type: 'text', text: 'teste' }],
            user_defined: {},
        });
    });

    it('sendMessage-error', async () => {
        jest.spyOn(httpService, 'post').mockImplementationOnce(() => {
            throw new Error('Error');
        });
        const result = await service.sendMessage(
            'conversation_start',
            '1234567',
        );
        expect(result.data).toEqual({
            generic: [
                {
                    response_type: 'error',
                    text: 'Erro ao mandar mensagem ao watson',
                },
            ],
        });
    });
});
