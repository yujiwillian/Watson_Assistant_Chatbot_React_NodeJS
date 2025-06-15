"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AssistantService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
let AssistantService = AssistantService_1 = class AssistantService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(AssistantService_1.name);
    }
    async generateNewSession() {
        this.logger.log('Creating a new Watson conversation session...deploy versao1.0.80');
        const env = process.env.NODE_ENV;
        this.logger.log('Variável de ambiente ao criar a sessão: ', env);
        const assistantId = env === 'homologation'
            ? this.configService.get('ASSISTANT_ID_DEV')
            : this.configService.get('ASSISTANT_ID');
        this.logger.log('ASSISTANT ID: ', assistantId);
        console.log("deploy versao1.0.80");
        let response;
        try {
            response = (await (0, rxjs_1.lastValueFrom)(this.httpService.get('session')));
        }
        catch (error) {
            this.logger.log(error);
            const axiosResponse = {
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
    async deleteSession() {
        this.logger.log('Deleting a given Watson conversation session...');
        let response;
        try {
            response = (await (0, rxjs_1.lastValueFrom)(this.httpService.delete('session')));
        }
        catch (error) {
            const axiosResponse = {
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
    async sendMessage(message, chatId, actionPayload) {
        this.logger.log('Sending a new message to Watson conversation session...');
        const headersRequest = {
            sessionid: chatId,
        };
        let response;
        try {
            this.logger.log(message);
            response = (await (0, rxjs_1.lastValueFrom)(this.httpService.post('message', {
                input: {
                    text: message,
                },
                context: {
                    skills: {
                        mainskill: {
                            user_defined: Object.assign({}, actionPayload),
                        },
                    },
                },
            }, { headers: headersRequest })));
        }
        catch (error) {
            const axiosResponse = {
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
};
AssistantService = AssistantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AssistantService);
exports.AssistantService = AssistantService;
//# sourceMappingURL=assistant.service.js.map