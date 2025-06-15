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
var SnowService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowService = void 0;
const common_1 = require("@nestjs/common");
const util = require('util');
const authorization_service_1 = require("../../utils/authorization.service");
const logger_service_1 = require("../../utils/logger.service");
const FormData = require('form-data');
const tunnel = require("tunnel");
const axios_1 = require("axios");
let SnowService = SnowService_1 = class SnowService {
    constructor(authorizationService, loggerService) {
        this.authorizationService = authorizationService;
        this.loggerService = loggerService;
        this.baseUrl = process.env.ACTIONS_URL_SNOW;
        this.logger = new common_1.Logger(SnowService_1.name);
    }
    async createIncident(data, path) {
        this.loggerService.debugLog('CREATE INCIDENT');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'INC-SN-CREATE-FAILURE');
            throw new Error('INC-SN-CREATE-FAILURE');
        }
    }
    async incidentQuery(data, messages) {
        this.loggerService.debugLog('INCIDENT QUERY');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data.incId,
                data: null,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'INC-QUERY-SN-FAILURE');
            throw new Error('INC-QUERY-SN-FAILURE');
        }
    }
    async createRitm(data, path) {
        this.loggerService.debugLog('CREATE RITM');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            this.loggerService.debugLog('TUNNELING:', tunnelingAgent);
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            console.log(error);
            this.loggerService.throwError(error, 'REQ-SN-OPEN-FAILURE');
            throw new Error('REQ-SN-OPEN-FAILURE');
        }
    }
    async consultReq(data) {
        this.loggerService.debugLog('CONSULT REQ');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl +
                    '/now/table/sc_req_item?request=' +
                    data.result.number,
                data: null,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            console.log(error);
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');
            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }
    async getRitm(data) {
        this.loggerService.debugLog('GET RITM');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            this.loggerService.debugLog('TUNNELING:', tunnelingAgent);
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data.rsId,
                data: null,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');
            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }
    async attach(data, file) {
        this.loggerService.debugLog('ATTACH');
        const form = new FormData();
        form.append('table_name', data.typeOfTable.table_name);
        form.append('table_sys_id', data.sysId);
        form.append('file', 'type:*/*');
        form.append('filename', file.buffer, file.originalname, file.mimetype);
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/now/attachment/upload',
                data: form,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                    'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
                },
                maxBodyLength: 20 * 1024 * 1024,
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'RS-ATTACH-FAILURE');
            throw new Error('RS-ATTACH-FAILURE');
        }
    }
    async consultAttachment(data) {
        this.loggerService.debugLog('CONSULT ATTACHMENT');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data,
                data: null,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'INC-QUERY-SN-FAILURE');
            throw new Error('INC-QUERY-SN-FAILURE');
        }
    }
    async createREQorInc(data, path) {
        this.loggerService.debugLog('CREATE REQ OR INC');
        try {
            const tunnelingAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.PROXY_URL,
                    port: Number(process.env.PROXY_PORT),
                    proxyAuth: `${process.env.PROXY_USER}:${process.env.PROXY_PASS}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            });
            const axiosInstance = axios_1.default.create({
                httpsAgent: tunnelingAgent,
            });
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization: this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        }
        catch (error) {
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');
            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }
};
SnowService = SnowService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService,
        logger_service_1.LoggerService])
], SnowService);
exports.SnowService = SnowService;
//# sourceMappingURL=snow.service.js.map