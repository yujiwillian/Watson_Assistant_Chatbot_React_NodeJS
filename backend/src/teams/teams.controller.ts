import { Inject, Controller, Post, Req, Res, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    BotFrameworkAdapter,
    ConversationState,
    TurnContext,
} from 'botbuilder';
import { Request, Response } from 'express';
import { TeamsService } from './teams.service';
import { LogdnaService } from 'logdna/logdna.service';
import * as util from 'util';
import { ConfigService } from '@nestjs/config';
const _inspect = obj => console.log(util.inspect(obj, false, null, true));

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
    private readonly logger: Logger = new Logger(TeamsController.name);
    private adapter: BotFrameworkAdapter;

    constructor(
        private readonly config: ConfigService,
        private readonly teamsService: TeamsService,
        @Inject('ConversationState')
        private conversationState: ConversationState,
    ) {
        this.adapter = new BotFrameworkAdapter({
            appId: this.config.get('TEAMS_APP_ID'),
            appPassword: this.config.get('TEAMS_APP_PASSWORD'),
        });

        // Catch-all for errors.
        this.adapter.onTurnError = async (context, error) => {
            // This check writes out errors to console log .vs. app insights.
            console.error(error);
            console.error(`\n [onTurnError]: ${error}`);

            await context.sendActivity(
                `Ocorreu um erro. Por favor, mande uma nova mensagem para reiniciar a sua conversa.`,
            );

            // Clear out state
            await this.conversationState.delete(context);

            this.logger.log(error.message);
        };
    }

    @Post()
    async message(@Res() res: Response, @Req() req: Request): Promise<void> {
        this.adapter.processActivity(
            req,
            res,
            async (turnContext: TurnContext) => {
                await this.teamsService.run(turnContext);
            },
        );
    }
}
