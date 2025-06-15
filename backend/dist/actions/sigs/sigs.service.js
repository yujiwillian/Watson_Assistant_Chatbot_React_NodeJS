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
var SigsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const util = require('util');
let SigsService = SigsService_1 = class SigsService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(SigsService_1.name);
        this.baseUrl = process.env.ACTIONS_URL;
        this.requestUsername = process.env.ACTIONS_USERNAME;
        this.requestPassword = process.env.ACTIONS_PASSWORD;
        this.environment = process.env.NODE_ENV;
    }
    async createIncident(data, messages) {
        const reqData = data;
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('create_incidente_homolog');
            const response = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS', reqData.abertura, {
                headers: {
                    auth: authHeader,
                },
            })).catch(err => {
                console.log(err);
                throw new Error('INC-CREATE-FAILURE');
            });
            console.log(response);
            return response;
        }
        else {
            const response = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS', reqData.abertura, {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            })).catch(err => {
                console.log(err);
                throw new Error('INC-CREATE-FAILURE');
            });
            console.log(response);
            return response;
        }
    }
    async solveIncident(data, messages) {
        const reqData = data;
        this.logger.debug('entrou reData');
        console.log({ reqData });
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('solveIncident_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('solveIncident_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        const response_abertura = (await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS', reqData.abertura, Header_Const)).catch(err => {
            console.log(err);
            throw new Error('INC-CREATE-FAILURE');
        }));
        console.log('response_abertura:', response_abertura);
        const _inspect = obj => console.log(util.inspect(obj, false, null, true));
        console.log('passou da abertura do chamado');
        const messages_tratamento = response_abertura.data.Messages[0];
        const exp = /(IN)[0-9]{0,7}/;
        const numeroIn = exp.exec(messages_tratamento)[0];
        console.log('gerou numero do chamado', numeroIn);
        const response_tratamento = await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl +
            `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/UPDATE`, reqData.tratamento, Header_Const)).catch(err => {
            console.log(err);
            throw new Error('INC-TRATAMENTO-FAILURE');
        });
        console.log('response_tratamento:', response_tratamento);
        const response_fechamento = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl +
            `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/Resolve`, reqData.fechamento, Header_Const)).catch(err => {
            console.log(err);
            throw new Error('INC-SOLVE-FAILURE');
        });
        console.log('response fechamento', response_fechamento);
        return response_fechamento;
    }
    async attach(number, fileBuffer, fileName) {
        console.log('nome do arquivo anexo: ', fileName);
        console.log('numero chamado:', number);
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('anexo_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('anexo_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        let url = '';
        if (number.match(/RS.*/)) {
            url = '/SM/9/rest/ItemLinhaPadraoREST/' + number + '/attachments';
            console.log('url de rs montada:', url);
        }
        else {
            url =
                '/SM/9/rest/IncidentManagementPadraoDS/' +
                    number +
                    '/attachments';
            console.log('url de in montada:', url);
        }
        const response = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + url, fileBuffer, Header_Const)).catch(err => {
            console.log('retorno_erro_anexo', err);
            console.log('resposta_erro_sigs_3:', err.response.data.Messages[0]);
            throw new Error('RS-ATTACH-FAILURE');
        });
        return response;
    }
    async serviceOpeningRequest(data, messages) {
        const reqData = data;
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('serviceOpeningRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('serviceOpeningRequest_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        const response = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + '/SM/9/rest/ReqInternalToolsPadraoREST', reqData.abertura, Header_Const)).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-OPEN-FAILURE');
        });
        console.log(response);
        return response;
    }
    async solveServiceRequest(data, messages) {
        const reqData = data;
        console.log('entrou reqData', { reqData });
        console.log('reqData abertura', reqData.abertura);
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('solveServiceRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('solveServiceRequest_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        const response_abertura_rs = (await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl + '/SM/9/rest/ReqInternalToolsPadraoREST', reqData.abertura, Header_Const)).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-BOT-OPEN-FAILURE');
        }));
        console.log('gerou abertura de rs para o bot', response_abertura_rs);
        const rsNumber = response_abertura_rs.data.ReqInternalToolsPadraoREST.Number +
            '-001';
        console.log('gerou RS de abertura do bot', rsNumber);
        const response_fechamento_rs = (0, rxjs_1.lastValueFrom)(this.httpService.post(this.baseUrl +
            `/SM/9/rest/ItemLinhaPadraoREST/${rsNumber}/action/Close`, reqData.fechamento, Header_Const)).catch(err => {
            throw new Error('RS-BOT-CLOSE-FAILURE');
        });
        console.log('response_fechamento_rs', response_fechamento_rs);
        return response_fechamento_rs;
    }
    async incidentQuery(data, messages) {
        this.logger.log('inicio incidentQuery');
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('solveServiceRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('solveServiceRequest_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        const response = (0, rxjs_1.lastValueFrom)(this.httpService.get(this.baseUrl +
            '/SM/9/rest/IncidentManagementPadraoOpenBankingREST/' +
            data.incId, Header_Const)).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('INC-QUERY-FAILURE');
        });
        console.log(response);
        return response;
    }
    async serviceRequestQuery(data, messages) {
        const rsId = data.rsId;
        let Header_Const = {};
        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(`${this.requestUsername}:${this.requestPassword}`).toString('base64')}`;
            console.log('ServiceRequestQuery_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        else {
            console.log('ServiceRequestQuery_prod');
            Header_Const = {
                auth: {
                    username: this.requestUsername
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                    password: this.requestPassword
                        .replace(/(\\r\\n|\\n|\\r)/gm, '')
                        .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                        .trim(),
                },
            };
        }
        const response = (0, rxjs_1.lastValueFrom)(this.httpService.get(this.baseUrl + '/SM/9/rest/ItemLinhaPadraoREST/' + rsId, Header_Const)).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-QUERY-FAILURE');
        });
        console.log(response);
        return response;
    }
};
SigsService = SigsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SigsService);
exports.SigsService = SigsService;
//# sourceMappingURL=sigs.service.js.map