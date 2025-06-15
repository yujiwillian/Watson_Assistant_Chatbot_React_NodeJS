import { LoggerService } from '@nestjs/common';
export declare class LogdnaService implements LoggerService {
    private dna;
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    constructor(context?: string, isTimestampEnabled?: boolean);
}
