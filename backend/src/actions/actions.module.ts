import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { SigsModule } from './sigs/sigs.module';
import { TemModule } from './tem/tem.module';
import { SnowModule } from './snow/snow.module';
import { LoggerService } from 'utils/logger.service';

@Module({
    imports: [SigsModule, TemModule, SnowModule],
    providers: [ActionsService, LoggerService],
})
export class ActionsModule {}
