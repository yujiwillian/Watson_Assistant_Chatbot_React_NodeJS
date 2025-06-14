import { Header, Injectable, Logger } from '@nestjs/common';
import {
    IncidentQueryResponseSnow,
    ServiceNowIncident,
    ServiceNowRitm,
} from 'actions/interfaces';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
const util = require('util');
import { AuthorizationService } from 'utils/authorization.service';
import { LoggerService } from 'utils/logger.service';
const FormData = require('form-data');
import * as tunnel from 'tunnel';
import axios from 'axios';
@Injectable()
export class SnowService {
    private baseUrl = process.env.ACTIONS_URL_SNOW;
    private readonly logger: Logger = new Logger(SnowService.name);

    constructor(
        private authorizationService: AuthorizationService,
        private loggerService: LoggerService,
    ) {}

    async createIncident(
        data: any,
        path: any,
    ): Promise<AxiosResponse<ServiceNowIncident>> {
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
            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'INC-SN-CREATE-FAILURE');
            throw new Error('INC-SN-CREATE-FAILURE');
        }
    }
    //Consultar incidente
    async incidentQuery(
        data: any,
        messages: any,
    ): Promise<AxiosResponse<IncidentQueryResponseSnow>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data.incId,
                data: null,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'INC-QUERY-SN-FAILURE');
            throw new Error('INC-QUERY-SN-FAILURE');
        }
    }

    async createRitm(
        data: any,
        path: any,
    ): Promise<AxiosResponse<ServiceNowRitm>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);

            return response;
        } catch (error) {
            console.log(error);
            this.loggerService.throwError(error, 'REQ-SN-OPEN-FAILURE');
            throw new Error('REQ-SN-OPEN-FAILURE');
        }
    }

    async consultReq(data: any): Promise<AxiosResponse<ServiceNowRitm>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'GET',
                url:
                    this.baseUrl +
                    '/now/table/sc_req_item?request=' +
                    data.result.number,
                data: null,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            console.log(error);
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');

            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }

    async getRitm(data: any): Promise<AxiosResponse<ServiceNowRitm>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });

            this.loggerService.debugLog('TUNNELING:', tunnelingAgent);

            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data.rsId,
                data: null,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });

            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);

            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');

            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }

    async attach(data: any, file: any): Promise<AxiosResponse<any>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/now/attachment/upload',
                data: form,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                    'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
                },
                maxBodyLength: 20 * 1024 * 1024,
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'RS-ATTACH-FAILURE');
            throw new Error('RS-ATTACH-FAILURE');
        }
    }

    async consultAttachment(data: any): Promise<AxiosResponse<any>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'GET',
                url: this.baseUrl + '/now/table/' + data,
                data: null,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'INC-QUERY-SN-FAILURE');
            throw new Error('INC-QUERY-SN-FAILURE');
        }
    }

    async createREQorInc(data: any, path: any): Promise<AxiosResponse<any>> {
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

            // Criação de uma instância do Axios
            const axiosInstance = axios.create({
                httpsAgent: tunnelingAgent,
            });
            // Realiza a chamada à API
            const response = await axiosInstance({
                method: 'POST',
                url: this.baseUrl + '/sn_sc/servicecatalog/items/' + path,
                data: data,
                headers: {
                    Authorization:
                        this.authorizationService.getAuthorizationHeader(),
                },
            });
            this.loggerService.debugLog('DATA RESULT :');
            this.loggerService.debugLog(response.data, response);
            return response;
        } catch (error) {
            this.loggerService.throwError(error, 'RITM-SN-QUERY-FAILURE');

            throw new Error('RITM-SN-QUERY-FAILURE');
        }
    }
}
