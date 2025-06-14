import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AssistantService } from 'assistant/assistant.service';
import { ChatResponse, WatsonRespose } from './interfaces';
import { ActionsService } from 'actions/actions.service';
import { PayloadData } from 'actions/interfaces';
import { SigsService } from 'actions/sigs/sigs.service';
import { SnowService } from 'actions/snow/snow.service';
import { TypeService } from 'utils/type.service';
import { LoggerService } from 'utils/logger.service';

@Injectable()
export class ChatService {
    private readonly logger: Logger = new Logger(ChatService.name);
    constructor(
        private readonly assistantService: AssistantService,
        private readonly actionService: ActionsService,
        private readonly sigsService: SigsService,
        private readonly snowService: SnowService,
        private readonly typeService: TypeService,
        private loggerService: LoggerService,
    ) {}

    async beginSession() {
        const { data } = await this.assistantService.generateNewSession();
        return data.session_id;
    }

    async run(
        chatId: string,
        message: string,
        channel: string,
        payload: PayloadData,
    ): Promise<ChatResponse> {
        if (!chatId) chatId = await this.beginSession();
        if (!chatId) {
            return {
                messages: this.preparePayload([
                    {
                        response_type: 'error',
                        text: 'Erro ao criar uma sessão com watson',
                    },
                ]),
                chatId: chatId,
            };
        }

        const { data } = await this.assistantService.sendMessage(
            message,
            chatId,
            payload,
        );

        console.log(data);
        console.log();
        const res = {
            url: data.skillsContext.url || '',
            body_service_now: data.skillsContext.body_service_now || '',
            ticket: data.skillsContext.ticket || '',
            incident: data.skillsContext.attachment || '',
            attachFirst: data.skillsContext.attachFirst || '',
            skillsContext: data.skillsContext || '',
        };
        if (data.skillsContext.action) {
            if (data.skillsContext.action.length == 0) {
                return Promise.reject(
                    new BadRequestException(
                        'skillsContext exists but actions are not defined',
                    ),
                );
            }
            const actionPayload = await this.actionService.runActions(data);
            console.log('ACTION PAYLOAD', actionPayload);
            const generic = data.generic;
            for (const payload of actionPayload) {
                const { data } = await this.assistantService.sendMessage(
                    payload.message,
                    chatId,
                    payload.payload,
                );
                data.generic.unshift(...generic);
                console.log('PAYLOAD', this.preparePayload(data.generic));
                return {
                    messages: this.preparePayload(data.generic),
                    chatId: chatId,
                };
            }
        } else {
            if (!!data.skillsContext.attachment && channel != 'teams') {
                data.generic.push({
                    response_type: 'attachment',
                    incident: JSON.stringify(res),
                });
            }

            const x = this.preparePayload(data.generic);
            console.log(x);
            return {
                messages: x,
                chatId: chatId,
            };
        }
    }

    //SNOW ATTACHMENT1
    async attach(chatId, number, file, channel) {
        let attachmentStatus = null;
        let result = null;
        let typeOfTable = null;
        let sysId = null;
        let reqId = null;
        try {
            if (number.attachFirst)
                return await this.attachFirst(chatId, number, file, channel);

            typeOfTable = this.typeService.getTableName(number.incident);
            this.loggerService.debugLog('TIPO DE TABELA: ');

            this.loggerService.debugLog(typeOfTable);
            if (!typeOfTable.type)
                return await this.attachment(
                    chatId,
                    number.incident,
                    file,
                    channel,
                );

            result = await this.snowService.consultAttachment(typeOfTable.url);
            this.loggerService.debugLog(' CONSULT ATTACHMENT');

            if (typeOfTable.ritm) {
                reqId = await this.snowService.consultAttachment(
                    `${typeOfTable.url2}${result.data.result[0].request}`,
                );
                sysId = reqId.data.result[0].sys_id;
            } else {
                sysId = result.data.result[0].sys_id;
            }

            const data = {
                sysId,
                typeOfTable,
            };

            attachmentStatus = await this.snowService.attach(data, file);
            this.loggerService.debugLog('ATTACHMENT-SUCCESS');

            return await this.run(chatId, 'ATTACHMENT-SUCCESS', channel, {
                data: attachmentStatus.data,
                success: true,
            });
        } catch (e) {
            this.loggerService.debugLog('ATTACHMENT-FAILED');

            this.loggerService.debugLog(e);
            return await this.run(chatId, 'ATTACHMENT-FAILED', channel, {
                data: null,
                success: true,
            });
        }
    }
    async attachFirst(chatId, number, file, channel) {
        let attachmentStatus = null;
        let typeOfTable = null;
        let data = null;
        let sysId = null;
        let reqData = null;
        try {
            typeOfTable = this.typeService.getTableName(number.incident);

            if (typeOfTable.ritm) {
                number.skillsContext.action = [
                    { data: 'ANEXO PRIMEIRO', action: 'create-ritm-sn' },
                ];
                const newReq = await this.actionService.runActions({
                    skillsContext: number.skillsContext,
                });

                sysId = newReq[0].payload.data;

                data = {
                    inc: sysId.result[0].number,
                    sysId: sysId.result[0].sys_id,
                    typeOfTable,
                };
                number.skillsContext.ticketData = data.inc;
            } else {
                number.skillsContext.action = [
                    { data: 'ANEXO PRIMEIRO', action: 'create-inc-sn' },
                ];

                const newInc = await this.actionService.runActions({
                    skillsContext: number.skillsContext,
                });

                sysId = newInc[0].payload.data;
                data = {
                    inc: sysId.result.number,
                    sysId: sysId.result.sys_id,
                    typeOfTable,
                };

                number.skillsContext.ticketData = data.inc;
            }
            attachmentStatus = await this.snowService.attach(data, file);
            attachmentStatus.data.result.ticketData = data.inc;
            return await this.run(chatId, 'ATTACHMENT-SUCCESS', channel, {
                data: attachmentStatus.data,
                success: true,
            });
        } catch (e) {
            this.loggerService.debugLog('ATTACHMENT-FAILED');
            this.loggerService.debugLog(e);

            return await this.run(chatId, 'ATTACHMENT-FAILED', channel, {
                data: null,
                success: true,
            });
        }
    }
    //SIGS ATTACHMENT
    async attachment(chatId, number, file, channel) {
        let attachmentStatus = null;
        try {
            attachmentStatus = await this.sigsService.attach(
                number,
                file.buffer,
                file.originalname,
            );
            console.log('Attachment success');
            console.log(attachmentStatus);
            return await this.run(chatId, 'ATTACHMENT-SUCCESS', channel, {
                data: null,
                success: true,
            });
        } catch (e) {
            console.log('Attachment failed');
            console.log(e);
            return await this.run(chatId, 'ATTACHMENT-FAILED', channel, {
                data: null,
                success: true,
            });
        }
    }
    preparePayload(responsePayload: Array<WatsonRespose>) {
        console.log(responsePayload);
        return responsePayload.map(item => {
            console.log(item);
            switch (item.response_type) {
                case 'text':
                    return {
                        type: 'text',
                        text: item.text,
                    };
                case 'option':
                case 'options':
                    return {
                        dropdown: item.title === 'dropdown',
                        type: 'options',
                        options: item.options.map(option => ({
                            label: option.label,
                            value: option.value.input.text,
                        })),
                    };
                case 'image':
                    if (item.title === 'video') {
                        return {
                            type: 'video',
                            url: item.source,
                        };
                    }
                    return {
                        type: 'image',
                        url: item.source,
                        alt: item.description,
                    };
                case 'attachment':
                    return {
                        type: 'attachment',
                        text: item.text,
                        incident: item.incident,
                    };
                case 'error':
                    return {
                        type: 'error',
                        text: item.text,
                    };
            }
        });
    }
}
