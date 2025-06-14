import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SigsService } from './sigs.service';

@Module({
    providers: [SigsService],
    imports: [HttpModule],
    exports: [SigsService],
})
export class SigsModule {}
