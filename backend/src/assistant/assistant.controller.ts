import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Logger,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssistantService } from './assistant.service';
import { MessageDto } from './dto/message.dto';
import { SessionGuard } from './guards/session.guard';
import { CreateSession, DeleteSession, Message } from './interfaces';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
    private readonly logger: Logger = new Logger(AssistantController.name);
    constructor(private readonly assistantService: AssistantService) {}

    @Post('session')
    async createSession(): Promise<CreateSession> {
        const response = await this.assistantService.generateNewSession();

        return response.data;
    }

    @ApiBearerAuth('sessionid')
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @UseGuards(SessionGuard)
    @Delete('session')
    async deleteSession(): Promise<DeleteSession> {
        const response = await this.assistantService.deleteSession();

        return response.data;
    }

    @ApiBearerAuth('sessionid')
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @UseGuards(SessionGuard)
    @Post('message')
    async sendMessage(
        @Body() body: MessageDto,
        @Headers() headers,
    ): Promise<Message> {
        const chatId = headers.sessionid;
        const response = await this.assistantService.sendMessage(
            body.message,
            chatId,
        );

        return response.data;
    }
}
