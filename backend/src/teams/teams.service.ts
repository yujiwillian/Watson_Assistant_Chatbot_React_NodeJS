import { Inject, Injectable, Logger } from '@nestjs/common';
import { AssistantService } from 'assistant/assistant.service';
import { GenericMessage } from 'assistant/interfaces';
import {
    ActionTypes,
    Activity,
    ActivityHandler,
    CardFactory,
    ConversationState,
    MessageFactory,
    StatePropertyAccessor,
    TurnContext,
} from 'botbuilder-core';
import { ConversationMemory } from './interfaces';
import { NextFunction } from 'express';

const CONVERSATION_DATA_PROPERTY = 'CONVERSATION_DATA_PROPERTY';
import util from 'util';

@Injectable()
export class TeamsService extends ActivityHandler {
    private accessor: StatePropertyAccessor<ConversationMemory>;

    private memory: ConversationMemory;
    private readonly logger: Logger = new Logger(TeamsService.name);

    constructor(
        private readonly assistantService: AssistantService,
        @Inject('ConversationState')
        private conversationState: ConversationState,
    ) {
        super();

        this.accessor =
            this.conversationState.createProperty<ConversationMemory>(
                CONVERSATION_DATA_PROPERTY,
            );

        this.onMessage(async (turnContext: TurnContext, next: NextFunction) => {
            this.memory = await this.accessor.get(turnContext);

            try {
                if (!this.memory?.sessionId) {
                    await this.createSession(turnContext);
                    await this.handleMessage(turnContext, true);
                } else {
                    await this.handleMessage(turnContext, false);
                }
            } catch (error) {
                this.cleanAssistantSession(turnContext);
                throw error;
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    async run(context) {
        await super.run(context);
        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
    }

    async createSession(turnContext: TurnContext): Promise<void> {
        this.logger.debug('turnContext:');
        this.logger.debug({ turnContext });
        const { data } = await this.assistantService.generateNewSession();

        this.memory = {
            sessionId: data.session_id,
            activities: [],
            activitiesRaw: [],
        };

        await this.accessor.set(turnContext, this.memory);

        await this.conversationState.saveChanges(turnContext);
    }

    async handleMessage(
        turnContext: TurnContext,
        firstInteraction = false,
    ): Promise<void> {
        if (turnContext.activity.type === 'message') {
            const message = firstInteraction
                ? 'conversation_start'
                : turnContext?.activity?.text;
            const { data } = await this.assistantService.sendMessage(
                this.getFilteredText(message),
                this.memory.sessionId,
            );

            if (data.generic.length === 0) {
                await turnContext.sendActivity('Não entendi sua mensagem!');
            }

            const formattedActivities: Array<Partial<Activity>> = [];

            for (const genericMessage of data.generic) {
                switch (genericMessage.response_type) {
                    case 'text':
                        formattedActivities.push({
                            text: genericMessage.text,
                        });
                        break;
                    case 'option':
                        formattedActivities.push(
                            this.createCardActions(genericMessage),
                        );
                        break;
                    case 'image':
                        formattedActivities.push(
                            this.addImagesInConversation(genericMessage),
                        );
                        break;
                    default:
                        break;
                }
            }

            this.memory.activitiesRaw = formattedActivities;

            const activities = await turnContext.sendActivities(
                formattedActivities,
            );

            const activitiesSelectionWillBeUpdated =
                await this.updateActivities(activities, firstInteraction);

            if (activitiesSelectionWillBeUpdated) {
                await turnContext.updateActivity(
                    activitiesSelectionWillBeUpdated,
                );
            }
        }
    }

    createCardActions(optionMessage: GenericMessage): Partial<Activity> {
        const cardActions = [];

        optionMessage.options.forEach(options => {
            cardActions.push({
                type: ActionTypes.ImBack,
                title: options.label,
                value: options.value.input.text,
                text: options.value.input.text,
            });
        });

        const card = CardFactory.heroCard(
            optionMessage.title || '',
            '',
            null,
            cardActions,
        );

        return MessageFactory.attachment(card);
    }

    addImagesInConversation(watsonMessage): Partial<Activity> {
        const image = {
            alt: watsonMessage.alt ? watsonMessage.alt : '',
            url: watsonMessage.source,
        };

        const card = CardFactory.heroCard(
            '',
            watsonMessage.title,
            CardFactory.images([image]),
            CardFactory.actions([
                {
                    type: ActionTypes.OpenUrl,
                    title: 'Clique para ver a imagem',
                    value: watsonMessage.source,
                },
            ]),
        );

        return MessageFactory.attachment(card);
    }

    async updateActivities(activities, isFirstInteraction = false) {
        let lastActivity;
        const currentActivitiesWithId = this.memory.activitiesRaw.map(
            (activity, index) => {
                return {
                    ...activity,
                    id: activities[index].id,
                };
            },
        );

        if (isFirstInteraction) {
            this.memory.activities = [...currentActivitiesWithId];
        } else {
            lastActivity = this.getActivityToUpdate();
        }
        this.updateActivitiesState(currentActivitiesWithId);

        return lastActivity;
    }

    getActivityToUpdate() {
        const invertedActivities = this.memory.activities.slice().reverse();

        const activityToUpdate = invertedActivities.find(activity => {
            return (
                activity.attachmentLayout &&
                activity.attachmentLayout === 'list'
            );
        });

        if (activityToUpdate) {
            const { buttons } = activityToUpdate.attachments[0].content;
            const optionsDisabled = this.formatDisabledOptions(buttons);

            const card = CardFactory.heroCard(null, optionsDisabled);

            const finalActivity = MessageFactory.attachment(card);
            finalActivity.id = activityToUpdate.id;

            return finalActivity;
        }

        return null;
    }

    updateActivitiesState(currentActivities) {
        if (this.memory.activities && this.memory.activities.length) {
            this.memory.activities = [
                ...this.memory.activities,
                ...currentActivities,
            ];
        }
    }

    formatDisabledOptions(options) {
        let optionsDisabled;

        options.forEach((option, index) => {
            if (index === 0) {
                optionsDisabled = `<ul><li>${option.title}</li>`;
            } else if (index === options.length - 1) {
                optionsDisabled = `${optionsDisabled} \n<li>${option.title}</li></ul>`;
            } else {
                optionsDisabled = `${optionsDisabled} \n<li>${option.title}</li>`;
            }
        });

        return optionsDisabled;
    }

    getFilteredText(text) {
        const filteredText = text.replace(/(\r\n|\n|\r)/gm, '');

        return filteredText;
    }

    async cleanAssistantSession(turnContext: TurnContext) {
        this.memory.sessionId = null;
        // Clear out state
        this.accessor.delete(turnContext);
    }
}
