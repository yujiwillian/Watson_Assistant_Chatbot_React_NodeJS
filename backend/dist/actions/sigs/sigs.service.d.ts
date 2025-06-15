import { HttpService } from '@nestjs/axios';
import { CreateIncidentResponse, ServiceOpeningRequestResponse, IncidentQueryReponse, ServiceRequestQueryResponse, ResolveIncidentResponse, SolveServiceRequestResponse } from 'actions/interfaces';
import { AxiosResponse } from 'axios';
export declare class SigsService {
    private httpService;
    private readonly logger;
    private baseUrl;
    private requestUsername;
    private requestPassword;
    private environment;
    constructor(httpService: HttpService);
    createIncident(data: any, messages: any): Promise<AxiosResponse<CreateIncidentResponse>>;
    solveIncident(data: any, messages: any): Promise<AxiosResponse<ResolveIncidentResponse>>;
    attach(number: any, fileBuffer: any, fileName: any): Promise<AxiosResponse<any>>;
    serviceOpeningRequest(data: any, messages: any): Promise<AxiosResponse<ServiceOpeningRequestResponse>>;
    solveServiceRequest(data: any, messages: any): Promise<AxiosResponse<SolveServiceRequestResponse>>;
    incidentQuery(data: any, messages: any): Promise<AxiosResponse<IncidentQueryReponse>>;
    serviceRequestQuery(data: any, messages: any): Promise<AxiosResponse<ServiceRequestQueryResponse>>;
}
