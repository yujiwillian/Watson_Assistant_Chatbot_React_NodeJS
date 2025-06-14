import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { TeamsService } from 'teams/teams.service';
import { ActionPayload } from './interfaces';
import { SigsService } from './sigs/sigs.service';
import { SnowService } from './snow/snow.service';
import { LoggerService } from 'utils/logger.service';
const util = require('util');

@Injectable()
export class ActionsService {
    private readonly logger: Logger = new Logger(ActionsService.name);
    constructor(
        private sigsService: SigsService,
        private snowService: SnowService,
        private loggerService: LoggerService,
    ) {}

    async runActions(data): Promise<ActionPayload[]> {
        const actionPayload: ActionPayload[] = [];
        this.logger.log(data);
        let messages = [];
        if (data.generic) {
            messages = data.generic
                .filter(m => m.response_type === 'text')
                .map(m => m.text);
        }
        this.logger.log(data);
        const actionList = Object.keys(data.skillsContext.action).reduce(
            (list, action) => {
                list.push({
                    type: data.skillsContext.action[action].action,
                    data: data.skillsContext.action[action].data,
                    var: data.skillsContext.body_service_now,
                    url: data.skillsContext.url,
                });

                return list;
            },
            [],
        );
        console.log('lendo action list', actionList);
        try {
            for (const action of actionList) {
                console.log('lendo action', action);
                switch (action.type) {
                    //SIGS ACTIONS
                    case 'create-inc':
                        const createIncidentResponse =
                            await this.sigsService.createIncident(
                                action.data,
                                messages,
                            );
                        // console.log(createIncidentResponse);
                        console.log(
                            'response_abertura:',
                            createIncidentResponse,
                        );
                        const _inspect = obj =>
                            console.log(util.inspect(obj, false, null, true));
                        _inspect(createIncidentResponse);

                        if (createIncidentResponse.data.ReturnCode !== 0) {
                            throw new Error('INC-CREATE-FAILURE');
                        }
                        actionPayload.push({
                            message: 'INC-CREATE-SUCCESS',
                            payload: {
                                success: true,
                                data: createIncidentResponse.data,
                            },
                        });
                        break;
                    case 'chatbot-inc':
                        console.log('entrou no chatbot-inc action service');
                        const solveIncidentResponse =
                            await this.sigsService.solveIncident(
                                action.data,
                                messages,
                            );

                        console.log(
                            'log de fechamento de incidente',
                            solveIncidentResponse,
                        );

                        if (solveIncidentResponse.data.ReturnCode !== 0) {
                            throw new Error('CHATBOT-INC-FAILURE');
                        }
                        actionPayload.push({
                            message: 'CHATBOT-INC-SUCCESS',
                            payload: {
                                success: true,
                                data: solveIncidentResponse.data,
                            },
                        });
                        break;
                    case 'open-rs':
                        const serviceOpeningRequestResponse =
                            await this.sigsService.serviceOpeningRequest(
                                action.data,
                                messages,
                            );
                        console.log(serviceOpeningRequestResponse);
                        if (
                            serviceOpeningRequestResponse.data.ReturnCode !== 0
                        ) {
                            throw new Error('RS-OPEN-FAILURE');
                        }
                        actionPayload.push({
                            message: 'RS-OPEN-SUCCESS',
                            payload: {
                                success: true,
                                data: serviceOpeningRequestResponse.data,
                            },
                        });
                        break;
                    case 'query-inc':
                        const incidentQueryReponse =
                            await this.sigsService.incidentQuery(
                                action.data,
                                messages,
                            );
                        console.log(incidentQueryReponse);
                        if (incidentQueryReponse.data.ReturnCode !== 0) {
                            throw new Error('INC-QUERY-FAILURE');
                        }
                        actionPayload.push({
                            message: 'INC-QUERY-SUCCESS',
                            payload: {
                                success: true,
                                data: incidentQueryReponse.data,
                            },
                        });
                        break;
                    case 'chatbot-rs':
                        console.log('entrou no close rs action service');
                        const solveRequestResponse =
                            await this.sigsService.solveServiceRequest(
                                action.data,
                                messages,
                            );

                        if (solveRequestResponse.data.ReturnCode !== 0) {
                            throw new Error('CHATBOT-RS-FAILURE');
                        }
                        actionPayload.push({
                            message: 'CHATBOT-RS-SUCCESS',
                            payload: {
                                success: true,
                                data: solveRequestResponse.data,
                            },
                        });
                        break;
                    case 'query-rs':
                        const serviceRequestQueryResponse =
                            await this.sigsService.serviceRequestQuery(
                                action.data,
                                messages,
                            );
                        console.log(serviceRequestQueryResponse);
                        if (serviceRequestQueryResponse.data.ReturnCode !== 0) {
                            throw new Error('RS-QUERY-FAILURE');
                        }
                        actionPayload.push({
                            message: 'RS-QUERY-SUCCESS',
                            payload: {
                                success: true,
                                data: serviceRequestQueryResponse.data,
                            },
                        });
                        break;

                    //SERVICE NOW ACTIONS

                    case 'create-inc-sn':
                        const createIncidentResponseSnow =
                            await this.snowService.createIncident(
                                action.var,
                                action.url,
                            );
                        this.loggerService.debugLog('INC-SN-CREATE-SUCCESS');
                        actionPayload.push({
                            message: 'INC-SN-CREATE-SUCCESS',
                            payload: {
                                success: true,
                                data: createIncidentResponseSnow.data,
                            },
                        });
                        break;

                    case 'query-inc-sn':
                        const incidentQueryResponseSnow =
                            await this.snowService.incidentQuery(
                                action.data,
                                messages,
                            );
                        this.loggerService.debugLog('INC-QUERY-SN-SUCCESS');

                        actionPayload.push({
                            message: 'INC-QUERY-SN-SUCCESS',
                            payload: {
                                success: true,
                                data: incidentQueryResponseSnow.data,
                            },
                        });
                        break;

                    case 'create-ritm-sn':
                        const createRitmResponseSnow =
                            await this.snowService.createRitm(
                                action.var,
                                action.url,
                            );
                        if (createRitmResponseSnow.status !== 200) {
                            throw new Error('REQ-SN-OPEN-FAILURE');
                        }
                        const getRitmResponseSnow =
                            await this.snowService.consultReq(
                                createRitmResponseSnow.data,
                            );
                        this.loggerService.debugLog('REQ-SN-OPEN-SUCCESS');

                        actionPayload.push({
                            message: 'REQ-SN-OPEN-SUCCESS',
                            payload: {
                                success: true,
                                data: getRitmResponseSnow.data,
                            },
                        });
                        break;

                    case 'query-ritm':
                        const ritmResponseSnow = await this.snowService.getRitm(
                            action.data,
                        );
                        this.loggerService.debugLog('RITM-SN-QUERY-SUCCESS');

                        actionPayload.push({
                            message: 'RITM-SN-QUERY-SUCCESS',
                            payload: {
                                success: true,
                                data: ritmResponseSnow.data,
                            },
                        });
                        break;
                }
            }
        } catch (error) {
            switch (error.message) {
                case 'RS-OPEN-FAILURE':
                    actionPayload.push({
                        message: 'RS-OPEN-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'RS-QUERY-FAILURE':
                    actionPayload.push({
                        message: 'RS-QUERY-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'INC-CREATE-FAILURE':
                    actionPayload.push({
                        message: 'INC-CREATE-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'INC-SOLVE-FAILURE':
                    actionPayload.push({
                        message: 'INC-SOLVE-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'INC-QUERY-FAILURE':
                    actionPayload.push({
                        message: 'INC-QUERY-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;

                case 'INC-SN-CREATE-FAILURE':
                    actionPayload.push({
                        message: 'INC-SN-CREATE-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'INC-QUERY-SN-FAILURE':
                    actionPayload.push({
                        message: 'INC-QUERY-SN-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'REQ-SN-OPEN-FAILURE':
                    actionPayload.push({
                        message: 'REQ-SN-OPEN-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });
                    break;
                case 'RITM-SN-QUERY-FAILURE':
                    actionPayload.push({
                        message: 'RITM-SN-QUERY-FAILURE',
                        payload: {
                            success: false,
                            data: {
                                ReturnCode: 0,
                            },
                        },
                    });

                    break;
                default:
                    break;
            }
        }

        return actionPayload;
    }
}
