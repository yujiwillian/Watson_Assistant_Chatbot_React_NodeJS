"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TeamsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const assistant_service_1 = require("../assistant/assistant.service");
const botbuilder_core_1 = require("botbuilder-core");
const CONVERSATION_DATA_PROPERTY = 'CONVERSATION_DATA_PROPERTY';
let TeamsService = TeamsService_1 = class TeamsService extends botbuilder_core_1.ActivityHandler {
    constructor(assistantService, conversationState) {
        super();
        this.assistantService = assistantService;
        this.conversationState = conversationState;
        this.logger = new common_1.Logger(TeamsService_1.name);
        this.accessor =
            this.conversationState.createProperty(CONVERSATION_DATA_PROPERTY);
        this.onMessage(async (turnContext, next) => {
            var _a;
            this.memory = await this.accessor.get(turnContext);
            try {
                if (!((_a = this.memory) === null || _a === void 0 ? void 0 : _a.sessionId)) {
                    await this.createSession(turnContext);
                    await this.handleMessage(turnContext, true);
                }
                else {
                    await this.handleMessage(turnContext, false);
                }
            }
            catch (error) {
                this.cleanAssistantSession(turnContext);
                throw error;
            }
            await next();
        });
    }
    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
    }
    async createSession(turnContext) {
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
    async handleMessage(turnContext, firstInteraction = false) {
        var _a;
        if (turnContext.activity.type === 'message') {
            const message = firstInteraction
                ? 'conversation_start'
                : (_a = turnContext === null || turnContext === void 0 ? void 0 : turnContext.activity) === null || _a === void 0 ? void 0 : _a.text;
            const { data } = await this.assistantService.sendMessage(this.getFilteredText(message), this.memory.sessionId);
            if (data.generic.length === 0) {
                await turnContext.sendActivity('Não entendi sua mensagem!');
            }
            const formattedActivities = [];
            for (const genericMessage of data.generic) {
                switch (genericMessage.response_type) {
                    case 'text':
                        formattedActivities.push({
                            text: genericMessage.text,
                        });
                        break;
                    case 'option':
                        formattedActivities.push(this.createCardActions(genericMessage));
                        break;
                    case 'image':
                        formattedActivities.push(this.addImagesInConversation(genericMessage));
                        break;
                    default:
                        break;
                }
            }
            this.memory.activitiesRaw = formattedActivities;
            const activities = await turnContext.sendActivities(formattedActivities);
            const activitiesSelectionWillBeUpdated = await this.updateActivities(activities, firstInteraction);
            if (activitiesSelectionWillBeUpdated) {
                await turnContext.updateActivity(activitiesSelectionWillBeUpdated);
            }
        }
    }
    createCardActions(optionMessage) {
        const cardActions = [];
        optionMessage.options.forEach(options => {
            cardActions.push({
                type: botbuilder_core_1.ActionTypes.ImBack,
                title: options.label,
                value: options.value.input.text,
                text: options.value.input.text,
            });
        });
        const card = botbuilder_core_1.CardFactory.heroCard(optionMessage.title || '', '', null, cardActions);
        return botbuilder_core_1.MessageFactory.attachment(card);
    }
    addImagesInConversation(watsonMessage) {
        const image = {
            alt: watsonMessage.alt ? watsonMessage.alt : '',
            url: watsonMessage.source,
        };
        const card = botbuilder_core_1.CardFactory.heroCard('', watsonMessage.title, botbuilder_core_1.CardFactory.images([image]), botbuilder_core_1.CardFactory.actions([
            {
                type: botbuilder_core_1.ActionTypes.OpenUrl,
                title: 'Clique para ver a imagem',
                value: watsonMessage.source,
            },
        ]));
        return botbuilder_core_1.MessageFactory.attachment(card);
    }
    async updateActivities(activities, isFirstInteraction = false) {
        let lastActivity;
        const currentActivitiesWithId = this.memory.activitiesRaw.map((activity, index) => {
            return Object.assign(Object.assign({}, activity), { id: activities[index].id });
        });
        if (isFirstInteraction) {
            this.memory.activities = [...currentActivitiesWithId];
        }
        else {
            lastActivity = this.getActivityToUpdate();
        }
        this.updateActivitiesState(currentActivitiesWithId);
        return lastActivity;
    }
    getActivityToUpdate() {
        const invertedActivities = this.memory.activities.slice().reverse();
        const activityToUpdate = invertedActivities.find(activity => {
            return (activity.attachmentLayout &&
                activity.attachmentLayout === 'list');
        });
        if (activityToUpdate) {
            const { buttons } = activityToUpdate.attachments[0].content;
            const optionsDisabled = this.formatDisabledOptions(buttons);
            const card = botbuilder_core_1.CardFactory.heroCard(null, optionsDisabled);
            const finalActivity = botbuilder_core_1.MessageFactory.attachment(card);
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
            }
            else if (index === options.length - 1) {
                optionsDisabled = `${optionsDisabled} \n<li>${option.title}</li></ul>`;
            }
            else {
                optionsDisabled = `${optionsDisabled} \n<li>${option.title}</li>`;
            }
        });
        return optionsDisabled;
    }
    getFilteredText(text) {
        const filteredText = text.replace(/(\r\n|\n|\r)/gm, '');
        return filteredText;
    }
    async cleanAssistantSession(turnContext) {
        this.memory.sessionId = null;
        this.accessor.delete(turnContext);
    }
};
TeamsService = TeamsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('ConversationState')),
    __metadata("design:paramtypes", [assistant_service_1.AssistantService,
        botbuilder_core_1.ConversationState])
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map