import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { PayloadData } from 'actions/interfaces';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { CreateSession, DeleteSession, Message } from './interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Injectable()
export class AssistantService {
    private readonly logger: Logger = new Logger(AssistantService.name);

    constructor(private httpService: HttpService, 
        private configService: ConfigService,

    ) {}

    async generateNewSession(): Promise<AxiosResponse<CreateSession>> {
        this.logger.log('Creating a new Watson conversation session...deploy versao1.0.80');
        //for development only
        // this.logger.log(this.httpService.axiosRef.defaults.headers);

        const env = process.env.NODE_ENV; //APENAS PARA NESTJS
        this.logger.log('Variável de ambiente ao criar a sessão: ',env);
        const assistantId = env === 'homologation' //SE igual homologation
        ? this.configService.get('ASSISTANT_ID_DEV') //ENTÃO vai para ASSISTANT_ID_DEV
        : this.configService.get('ASSISTANT_ID');   //SENÃO ASSISTANT_ID
        this.logger.log('ASSISTANT ID: ',assistantId); //Printado variável para check de ambiente 
        console.log("deploy versao1.0.80");
        let response: AxiosResponse<CreateSession>;
        try {
            response = (await lastValueFrom(
                this.httpService.get('session'),
            )) as AxiosResponse<CreateSession>;
        } catch (error) {
            this.logger.log(error);
            const axiosResponse: AxiosResponse<CreateSession> = {
                headers: {},
                status: 200,
                statusText: 'OK',
                data: {
                    session_id: null,
                    message: 'Erro ao criar a sessão',
                },
                config: undefined,
            };
            response = axiosResponse;
        }

        return response;
    }

    async deleteSession(): Promise<AxiosResponse<DeleteSession>> {
        this.logger.log('Deleting a given Watson conversation session...');
        let response: AxiosResponse<DeleteSession>;

        try {
            response = (await lastValueFrom(
                this.httpService.delete('session'),
            )) as AxiosResponse<DeleteSession>;
        } catch (error) {
            const axiosResponse: AxiosResponse<DeleteSession> = {
                headers: {},
                status: 200,
                statusText: 'OK',
                data: {
                    message: 'Erro ao deletar a sessão',
                },
                config: undefined,
            };
            response = axiosResponse;
        }

        return response;
    }

    async sendMessage(
        message: string,
        chatId: string,
        actionPayload?: PayloadData,
    ): Promise<AxiosResponse<Message>> {
        this.logger.log(
            'Sending a new message to Watson conversation session...',
        );
        const headersRequest = {
            sessionid: chatId,
        };
        let response: AxiosResponse<Message>;
        try {
            this.logger.log(message);

            response = (await lastValueFrom(
                this.httpService.post(
                    'message',
                    {
                        input: {
                            text: message,
                        },
                        context: {
                            // global: {
                            //     system: {
                            //         user_id: 'my_user_id',
                            //     },
                            // },
                            skills: {
                                mainskill: {
                                    user_defined: {
                                        ...actionPayload,
                                    },
                                },
                            },
                        },
                    },
                    { headers: headersRequest },
                ),
            )) as AxiosResponse<Message>;
        } catch (error) {
            const axiosResponse: AxiosResponse<Message> = {
                headers: {},
                status: 200,
                statusText: 'OK',
                data: {
                    generic: [
                        {
                            response_type: 'error',
                            text: 'Erro ao mandar mensagem ao watson',
                        },
                    ],
                },
                config: undefined,
            };
            response = axiosResponse;
        }
        return response;
    }
}
