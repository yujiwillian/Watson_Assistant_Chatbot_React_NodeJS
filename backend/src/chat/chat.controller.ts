import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { LogdnaService } from 'logdna/logdna.service';
import { ChatDto } from './dto/chat.dto';
import { ChatResponse } from './interfaces';
import {
    Body,
    Controller,
    Logger,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { PayloadData } from 'actions/interfaces';
import {
    AnyFilesInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express';
import { MorganInterceptor } from 'nest-morgan';

@ApiTags('chat')
@Controller('chat')
@UseInterceptors(MorganInterceptor('combined'))
export class ChatController {
    private readonly logger: Logger = new Logger(ChatService.name);

    constructor(private readonly chatService: ChatService) {}

    @Post()
    @ApiOperation({ summary: 'Interact with watson' })
    @ApiOkResponse({
        description: 'Watson Response',
        type: ChatDto,
    })
    async message(@Body() chatDto: ChatDto): Promise<ChatResponse> {
        const { chatId, message, payload } = chatDto;
        const response = await this.chatService.run(
            chatId,
            message,
            'web',
            payload,
        );

        return response;
    }

    @Post('attachment')
    @ApiOperation({ summary: 'Send an attachment to SIGS' })
    @ApiOkResponse({
        description: 'Attached successfully',
    })
    @UseInterceptors(AnyFilesInterceptor())
    async attach(
        @UploadedFiles() file: Array<Express.Multer.File>,
        @Body() chatDto,
    ) {
        const { chatId, number } = chatDto;
        try {
            const result = this.chatService.attach(
                chatId,
                JSON.parse(number),
                file[0],
                'web',
            );
            console.log('log result anexo', result);
            return result;
        } catch {
            console.log('falha ao executar anexo');
        }
    }
}
