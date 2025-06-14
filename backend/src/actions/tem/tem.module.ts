import { Module } from '@nestjs/common';
import { TemService } from './tem.service';

@Module({
    providers: [TemService],
})
export class TemModule {}
