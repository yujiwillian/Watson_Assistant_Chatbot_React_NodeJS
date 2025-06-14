export interface ChatResponse {
    messages: Array<ChatMessage>;
    chatId: string;
}

export interface ChatMessage {
    type: string;
    text?: string;
    list?: Array<ListOptions>;
    url?: string;
    alt?: string;
}

interface ListOptions {
    value: string;
    label: string;
}

export interface WatsonRespose {
    response_type: string;
    text?: string;
    title?: string;
    options?: Array<Options>;
    source?: string;
    description?: string;
    dropdown?: boolean;
    incident?: any;
    body?: any;
}

interface Options {
    label: string;
    value: Value;
}

interface Value {
    input: Text;
}

interface Text {
    text: string;
}
