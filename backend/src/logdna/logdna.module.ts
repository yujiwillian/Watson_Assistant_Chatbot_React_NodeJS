import { Module } from '@nestjs/common';
import { LogdnaService } from './logdna.service';

@Module({
    providers: [LogdnaService],
    exports: [LogdnaService],
})
export class LogdnaModule {}
