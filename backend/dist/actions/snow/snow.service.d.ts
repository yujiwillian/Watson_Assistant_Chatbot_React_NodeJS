import { IncidentQueryResponseSnow, ServiceNowIncident, ServiceNowRitm } from 'actions/interfaces';
import { AxiosResponse } from 'axios';
import { AuthorizationService } from 'utils/authorization.service';
import { LoggerService } from 'utils/logger.service';
export declare class SnowService {
    private authorizationService;
    private loggerService;
    private baseUrl;
    private readonly logger;
    constructor(authorizationService: AuthorizationService, loggerService: LoggerService);
    createIncident(data: any, path: any): Promise<AxiosResponse<ServiceNowIncident>>;
    incidentQuery(data: any, messages: any): Promise<AxiosResponse<IncidentQueryResponseSnow>>;
    createRitm(data: any, path: any): Promise<AxiosResponse<ServiceNowRitm>>;
    consultReq(data: any): Promise<AxiosResponse<ServiceNowRitm>>;
    getRitm(data: any): Promise<AxiosResponse<ServiceNowRitm>>;
    attach(data: any, file: any): Promise<AxiosResponse<any>>;
    consultAttachment(data: any): Promise<AxiosResponse<any>>;
    createREQorInc(data: any, path: any): Promise<AxiosResponse<any>>;
}
