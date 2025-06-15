import { HttpService } from '@nestjs/axios';
import { PayloadData } from 'actions/interfaces';
import { AxiosResponse } from 'axios';
import { CreateSession, DeleteSession, Message } from './interfaces';
import { ConfigService } from '@nestjs/config';
export declare class AssistantService {
    private httpService;
    private configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    generateNewSession(): Promise<AxiosResponse<CreateSession>>;
    deleteSession(): Promise<AxiosResponse<DeleteSession>>;
    sendMessage(message: string, chatId: string, actionPayload?: PayloadData): Promise<AxiosResponse<Message>>;
}
