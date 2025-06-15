import { AssistantService } from 'assistant/assistant.service';
import { ChatResponse, WatsonRespose } from './interfaces';
import { ActionsService } from 'actions/actions.service';
import { PayloadData } from 'actions/interfaces';
import { SigsService } from 'actions/sigs/sigs.service';
import { SnowService } from 'actions/snow/snow.service';
import { TypeService } from 'utils/type.service';
import { LoggerService } from 'utils/logger.service';
export declare class ChatService {
    private readonly assistantService;
    private readonly actionService;
    private readonly sigsService;
    private readonly snowService;
    private readonly typeService;
    private loggerService;
    private readonly logger;
    constructor(assistantService: AssistantService, actionService: ActionsService, sigsService: SigsService, snowService: SnowService, typeService: TypeService, loggerService: LoggerService);
    beginSession(): Promise<string>;
    run(chatId: string, message: string, channel: string, payload: PayloadData): Promise<ChatResponse>;
    attach(chatId: any, number: any, file: any, channel: any): Promise<ChatResponse>;
    attachFirst(chatId: any, number: any, file: any, channel: any): Promise<ChatResponse>;
    attachment(chatId: any, number: any, file: any, channel: any): Promise<ChatResponse>;
    preparePayload(responsePayload: Array<WatsonRespose>): ({
        type: string;
        text: string;
        dropdown?: undefined;
        options?: undefined;
        url?: undefined;
        alt?: undefined;
        incident?: undefined;
    } | {
        dropdown: boolean;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
        text?: undefined;
        url?: undefined;
        alt?: undefined;
        incident?: undefined;
    } | {
        type: string;
        url: string;
        text?: undefined;
        dropdown?: undefined;
        options?: undefined;
        alt?: undefined;
        incident?: undefined;
    } | {
        type: string;
        url: string;
        alt: string;
        text?: undefined;
        dropdown?: undefined;
        options?: undefined;
        incident?: undefined;
    } | {
        type: string;
        text: string;
        incident: any;
        dropdown?: undefined;
        options?: undefined;
        url?: undefined;
        alt?: undefined;
    })[];
}
