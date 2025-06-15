import { ConversationState } from 'botbuilder';
import { Request, Response } from 'express';
import { TeamsService } from './teams.service';
import { ConfigService } from '@nestjs/config';
export declare class TeamsController {
    private readonly config;
    private readonly teamsService;
    private conversationState;
    private readonly logger;
    private adapter;
    constructor(config: ConfigService, teamsService: TeamsService, conversationState: ConversationState);
    message(res: Response, req: Request): Promise<void>;
}
