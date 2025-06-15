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
var TeamsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const botbuilder_1 = require("botbuilder");
const teams_service_1 = require("./teams.service");
const util = require("util");
const config_1 = require("@nestjs/config");
const _inspect = obj => console.log(util.inspect(obj, false, null, true));
let TeamsController = TeamsController_1 = class TeamsController {
    constructor(config, teamsService, conversationState) {
        this.config = config;
        this.teamsService = teamsService;
        this.conversationState = conversationState;
        this.logger = new common_1.Logger(TeamsController_1.name);
        this.adapter = new botbuilder_1.BotFrameworkAdapter({
            appId: this.config.get('TEAMS_APP_ID'),
            appPassword: this.config.get('TEAMS_APP_PASSWORD'),
        });
        this.adapter.onTurnError = async (context, error) => {
            console.error(error);
            console.error(`\n [onTurnError]: ${error}`);
            await context.sendActivity(`Ocorreu um erro. Por favor, mande uma nova mensagem para reiniciar a sua conversa.`);
            await this.conversationState.delete(context);
            this.logger.log(error.message);
        };
    }
    async message(res, req) {
        this.adapter.processActivity(req, res, async (turnContext) => {
            await this.teamsService.run(turnContext);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "message", null);
TeamsController = TeamsController_1 = __decorate([
    (0, swagger_1.ApiTags)('teams'),
    (0, common_1.Controller)('teams'),
    __param(2, (0, common_1.Inject)('ConversationState')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        teams_service_1.TeamsService,
        botbuilder_1.ConversationState])
], TeamsController);
exports.TeamsController = TeamsController;
//# sourceMappingURL=teams.controller.js.map