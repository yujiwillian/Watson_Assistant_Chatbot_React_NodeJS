export interface CreateSession {
    session_id: string;
    message: string;
}
export interface DeleteSession {
    message: string;
}
export interface OptionMessageInput {
    text: string;
}
export interface OptionMessage {
    input: OptionMessageInput;
}
export interface Option {
    label: string;
    value: OptionMessage;
}
export interface GenericMessage {
    response_type: string;
    title?: string;
    text?: string;
    options?: Array<Option>;
    incident?: string;
    body?: any;
}
export interface Message {
    skillsContext?: any;
    generic: Array<GenericMessage>;
}
