import { Module } from '@nestjs/common';
import { SnowService } from './snow.service';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationService } from 'utils/authorization.service';
import { TypeService } from 'utils/type.service';
import { LoggerService } from 'utils/logger.service';

@Module({
    imports: [HttpModule],
    providers: [SnowService, AuthorizationService, TypeService, LoggerService],
    exports: [SnowService],
})
export class SnowModule {}
