interface buttons {
    type: string;
    title: string;
    value: string;
    text: string;
}

interface content {
    buttons: buttons[];
}

interface attachments {
    contentType?: string;
    content?: content;
}

interface activities {
    id: string;
    text?: string;
    type?: string;
    attachmentLayout?: string;
    attachments?: attachments[];
    inputHint?: string;
}
export interface ConversationMemory {
    sessionId: string;
    activities?: activities[];
    activitiesRaw?: any;
}
