import { Message } from 'assistant/interfaces';
import { AxiosResponse } from 'axios';
import { ActionPayload, IncidentQueryReponse, ServiceRequestQueryResponse } from './interfaces';
export declare const mockedData: Message;
export declare const actionPayload: ActionPayload[];
export declare const actionPayloadError: ActionPayload[];
export declare const queryInResponse: AxiosResponse<IncidentQueryReponse>;
export declare const queryInResponseError: AxiosResponse<IncidentQueryReponse>;
export declare const serviceQueryResponse: AxiosResponse<ServiceRequestQueryResponse>;
