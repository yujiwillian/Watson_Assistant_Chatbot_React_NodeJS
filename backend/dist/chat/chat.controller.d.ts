/// <reference types="multer" />
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ChatResponse } from './interfaces';
export declare class ChatController {
    private readonly chatService;
    private readonly logger;
    constructor(chatService: ChatService);
    message(chatDto: ChatDto): Promise<ChatResponse>;
    attach(file: Array<Express.Multer.File>, chatDto: any): Promise<ChatResponse>;
}
