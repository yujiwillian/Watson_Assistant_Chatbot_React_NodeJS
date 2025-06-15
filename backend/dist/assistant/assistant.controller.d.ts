import { AssistantService } from './assistant.service';
import { MessageDto } from './dto/message.dto';
import { CreateSession, DeleteSession, Message } from './interfaces';
export declare class AssistantController {
    private readonly assistantService;
    private readonly logger;
    constructor(assistantService: AssistantService);
    createSession(): Promise<CreateSession>;
    deleteSession(): Promise<DeleteSession>;
    sendMessage(body: MessageDto, headers: any): Promise<Message>;
}
