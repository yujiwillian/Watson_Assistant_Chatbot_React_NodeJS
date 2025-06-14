import { Logger, LoggerService } from '@nestjs/common';
import { createLogger, Logger as DnaLogger } from '@logdna/logger';

export class LogdnaService implements LoggerService {
    private dna: DnaLogger;

    log(message: string) {
        console.log(message);
    }
    error(message: string, trace: string) {
        console.error(message);
    }
    warn(message: string) {
        console.warn(message);
    }
    constructor(context?: string, isTimestampEnabled?: boolean) {
        // this.dna = createLogger(process.env.LOGDNA_KEY, {
        //     app: 'orchestrator-api',
        //     url: process.env.LOGDNA_URL,
        // });
    }

    // trace(message: string) {
    //     if (process.env.NODE_ENV === 'production') {
    //         this.dna.trace(message);
    //     } else {
    //         super.log(message);
    //     }
    // }
}
