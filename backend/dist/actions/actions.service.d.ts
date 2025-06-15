import { ActionPayload } from './interfaces';
import { SigsService } from './sigs/sigs.service';
import { SnowService } from './snow/snow.service';
import { LoggerService } from 'utils/logger.service';
export declare class ActionsService {
    private sigsService;
    private snowService;
    private loggerService;
    private readonly logger;
    constructor(sigsService: SigsService, snowService: SnowService, loggerService: LoggerService);
    runActions(data: any): Promise<ActionPayload[]>;
}
