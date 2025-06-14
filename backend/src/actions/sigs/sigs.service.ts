import { HttpService } from '@nestjs/axios';
import { Header, Injectable, Logger } from '@nestjs/common';
//enviar dados em formato form data multi part
import * as FormData from 'form-data';

import {
    CreateIncidentResponse,
    CreateIncidentData,
    ServiceOpeningRequestResponse,
    ServiceOpeningRequestData,
    IncidentQueryReponse,
    ServiceRequestQueryResponse,
    ResolveIncidentResponse,
    SolveServiceRequestResponse,
    CloseRSData,
    ResolveIncidentData,
} from 'actions/interfaces';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
const util = require('util');

@Injectable()
export class SigsService {
    private readonly logger: Logger = new Logger(SigsService.name);
    private baseUrl = process.env.ACTIONS_URL;
    private requestUsername = process.env.ACTIONS_USERNAME;
    private requestPassword = process.env.ACTIONS_PASSWORD;
    private environment = process.env.NODE_ENV;

    constructor(private httpService: HttpService) {}

    async createIncident(
        data,
        messages,
    ): Promise<AxiosResponse<CreateIncidentResponse>> {
        const reqData: CreateIncidentData = data;
        const ishomolog = this.environment == 'development';

        console.log('ambiente ', this.environment);

        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('create_incidente_homolog');

            const response = lastValueFrom(
                this.httpService.post<CreateIncidentResponse>(
                    this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS',
                    reqData.abertura,
                    {
                        headers: {
                            auth: authHeader,
                        },
                    },
                ),
            ).catch(err => {
                console.log(err);
                throw new Error('INC-CREATE-FAILURE');
            });
            console.log(response);
            return response as Promise<AxiosResponse<CreateIncidentResponse>>;
        } else {
            const response = lastValueFrom(
                this.httpService.post<CreateIncidentResponse>(
                    this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS',
                    reqData.abertura,
                    {
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
                    },
                ),
            ).catch(err => {
                console.log(err);
                throw new Error('INC-CREATE-FAILURE');
            });
            console.log(response);
            return response as Promise<AxiosResponse<CreateIncidentResponse>>;
        }
    }

    async solveIncident(
        data,
        messages,
    ): Promise<AxiosResponse<ResolveIncidentResponse>> {
        // const reqData: ResolveIncidentData = data;
        const reqData: CreateIncidentData = data;
        this.logger.debug('entrou reData');
        console.log({ reqData });

        let Header_Const = {};

        const ishomolog = this.environment == 'development';

        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('solveIncident_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        //inicio abertura de IN
        const response_abertura = (await lastValueFrom(
            this.httpService.post<CreateIncidentResponse>(
                this.baseUrl + '/SM/9/rest/IncidentManagementPadraoDS',
                // url + '/SM/9/rest/IncidentManagementPadraoDS',
                reqData.abertura,
                //autenticacao original
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            // this.logger.log(err);
            console.log(err);
            throw new Error('INC-CREATE-FAILURE');
        })) as unknown as CreateIncidentResponse;
        console.log('response_abertura:', response_abertura);
        const _inspect = obj =>
            console.log(util.inspect(obj, false, null, true));
        // _inspect(response_abertura);

        console.log('passou da abertura do chamado');

        const messages_tratamento = response_abertura.data.Messages[0];
        const exp = /(IN)[0-9]{0,7}/;
        const numeroIn = exp.exec(messages_tratamento)[0];
        //final abertura de IN

        console.log('gerou numero do chamado', numeroIn);

        const response_tratamento = await lastValueFrom(
            this.httpService.post<ResolveIncidentResponse>(
                this.baseUrl +
                    `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/UPDATE`,
                // url + `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/UPDATE`,
                // { ...reqData, action: 'solve-inc' },
                reqData.tratamento,
                // autenticacao original
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            // this.logger.log(err);
            console.log(err);
            throw new Error('INC-TRATAMENTO-FAILURE');
        });
        console.log('response_tratamento:', response_tratamento);
        // console.log('inpect response_tratamento');
        // _inspect(response_tratamento);

        //  context.skills.mainskill.user_defined.data.Messages[0].extract('incidente\\S*\\s+(.*?)\\s+foi', 1)
        // const call_number = response_abertura.Messages.extract('incidente\\S*\\s+(.*?)\\s+foi', 1)
        // call_number.

        const response_fechamento = lastValueFrom(
            this.httpService.post<ResolveIncidentResponse>(
                this.baseUrl +
                    `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/Resolve`,
                // url + `/SM/9/rest/IncidentManagementPadraoDS/${numeroIn}/action/Resolve`,
                // { ...reqData, action: 'solve-inc' },
                reqData.fechamento,
                //autenticacao original
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            // this.logger.log(err);
            console.log(err);
            throw new Error('INC-SOLVE-FAILURE');
        });
        console.log('response fechamento', response_fechamento);
        return response_fechamento as Promise<
            AxiosResponse<ResolveIncidentResponse>
        >;
    }

    //anexos raw binary
    async attach(number, fileBuffer, fileName): Promise<AxiosResponse<any>> {
        console.log('nome do arquivo anexo: ', fileName);
        console.log('numero chamado:', number);
        let Header_Const = {};

        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('anexo_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        // tratamento rs e in
        if (number.match(/RS.*/)) {
            url = '/SM/9/rest/ItemLinhaPadraoREST/' + number + '/attachments';
            console.log('url de rs montada:', url);
        } else {
            url =
                '/SM/9/rest/IncidentManagementPadraoDS/' +
                number +
                '/attachments';
            console.log('url de in montada:', url);
        }

        const response = lastValueFrom(
            this.httpService.post(
                this.baseUrl + url,
                fileBuffer,
                //autenticacao original
                // {
                //     headers: {
                //         'Content-Disposition': 'attachment;filename=' + fileName,
                //         'Content-Type': 'application/octet-stream',
                //     },
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            // this.logger.log(err);
            console.log('retorno_erro_anexo', err);
            // console.log('resposta_erro_sigs_1:', err.response.data);
            // console.log('resposta_erro_sigs_2:', err.response.data.Messages);
            console.log('resposta_erro_sigs_3:', err.response.data.Messages[0]);
            throw new Error('RS-ATTACH-FAILURE');
        });
        return response as Promise<AxiosResponse<any>>;
    }
    async serviceOpeningRequest(
        data,
        messages,
    ): Promise<AxiosResponse<ServiceOpeningRequestResponse>> {
        const reqData: ServiceOpeningRequestData = data;
        let Header_Const = {};

        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('serviceOpeningRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        const response = lastValueFrom(
            this.httpService.post<ServiceOpeningRequestResponse>(
                this.baseUrl + '/SM/9/rest/ReqInternalToolsPadraoREST',
                reqData.abertura,
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-OPEN-FAILURE');
        });
        console.log(response);
        return response as Promise<
            AxiosResponse<ServiceOpeningRequestResponse>
        >;
    }

    async solveServiceRequest(
        data,
        messages,
    ): Promise<AxiosResponse<SolveServiceRequestResponse>> {
        // const rsNumber = data.Numero;
        // console.log('rsNumber', rsNumber);
        // const reqData: CloseRSData = data.payload;
        const reqData: ServiceOpeningRequestData = data;
        console.log('entrou reqData', { reqData });
        console.log('reqData abertura', reqData.abertura);

        let Header_Const = {};

        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('solveServiceRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        // this.logger.debug({ reqData });
        const response_abertura_rs = (await lastValueFrom(
            this.httpService.post<ServiceOpeningRequestResponse>(
                this.baseUrl + '/SM/9/rest/ReqInternalToolsPadraoREST',
                reqData.abertura,
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-BOT-OPEN-FAILURE');
        })) as unknown as ServiceOpeningRequestResponse;
        console.log('gerou abertura de rs para o bot', response_abertura_rs);

        const rsNumber =
            response_abertura_rs.data.ReqInternalToolsPadraoREST.Number +
            '-001';

        console.log('gerou RS de abertura do bot', rsNumber);

        const response_fechamento_rs = lastValueFrom(
            this.httpService.post<any>(
                this.baseUrl +
                    `/SM/9/rest/ItemLinhaPadraoREST/${rsNumber}/action/Close`,
                reqData.fechamento,
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            throw new Error('RS-BOT-CLOSE-FAILURE');
        });
        console.log('response_fechamento_rs', response_fechamento_rs);
        return response_fechamento_rs as Promise<
            AxiosResponse<SolveServiceRequestResponse>
        >;
    }

    async incidentQuery(
        data,
        messages,
    ): Promise<AxiosResponse<IncidentQueryReponse>> {
        this.logger.log('inicio incidentQuery');
        // this.logger.log(this.httpService.axiosRef.defaults.headers);
        // this.logger.log('inicio data actions');
        // this.logger.log(this.httpService.axiosRef.defaults.data);
        let Header_Const = {};

        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('solveServiceRequest_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        const response = lastValueFrom(
            this.httpService.get<IncidentQueryReponse>(
                this.baseUrl +
                    '/SM/9/rest/IncidentManagementPadraoOpenBankingREST/' +
                    data.incId,
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('INC-QUERY-FAILURE');
        });
        console.log(response);
        return response as Promise<AxiosResponse<IncidentQueryReponse>>;
    }

    async serviceRequestQuery(
        data,
        messages,
    ): Promise<AxiosResponse<ServiceRequestQueryResponse>> {
        const rsId: string = data.rsId;

        let Header_Const = {};

        const ishomolog = this.environment == 'development';
        console.log('ambiente ', this.environment);

        //endpoint develop
        if (ishomolog) {
            const authHeader = `Basic ${Buffer.from(
                `${this.requestUsername}:${this.requestPassword}`,
            ).toString('base64')}`;

            console.log('ServiceRequestQuery_homolog');
            Header_Const = {
                headers: {
                    auth: authHeader,
                },
            };
        }
        //end point producao
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

        const response = lastValueFrom(
            this.httpService.get<ServiceRequestQueryResponse>(
                this.baseUrl + '/SM/9/rest/ItemLinhaPadraoREST/' + rsId,
                // {
                //     auth: {
                //         username: this.requestUsername
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //         password: this.requestPassword
                //             .replace(/(\\r\\n|\\n|\\r)/gm, '')
                //             .replace(/[^a-z0-9 ,._/:-=]/gi, '')
                //             .trim(),
                //     },
                // },
                Header_Const,
            ),
        ).catch(err => {
            this.logger.log(err);
            console.log(err);
            throw new Error('RS-QUERY-FAILURE');
        });
        console.log(response);
        return response as Promise<AxiosResponse<ServiceRequestQueryResponse>>;
    }
}
