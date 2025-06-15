import { AssistantService } from 'assistant/assistant.service';
import { GenericMessage } from 'assistant/interfaces';
import { Activity, ActivityHandler, ConversationState, TurnContext } from 'botbuilder-core';
export declare class TeamsService extends ActivityHandler {
    private readonly assistantService;
    private conversationState;
    private accessor;
    private memory;
    private readonly logger;
    constructor(assistantService: AssistantService, conversationState: ConversationState);
    run(context: any): Promise<void>;
    createSession(turnContext: TurnContext): Promise<void>;
    handleMessage(turnContext: TurnContext, firstInteraction?: boolean): Promise<void>;
    createCardActions(optionMessage: GenericMessage): Partial<Activity>;
    addImagesInConversation(watsonMessage: any): Partial<Activity>;
    updateActivities(activities: any, isFirstInteraction?: boolean): Promise<any>;
    getActivityToUpdate(): Partial<Activity>;
    updateActivitiesState(currentActivities: any): void;
    formatDisabledOptions(options: any): any;
    getFilteredText(text: any): any;
    cleanAssistantSession(turnContext: TurnContext): Promise<void>;
}
