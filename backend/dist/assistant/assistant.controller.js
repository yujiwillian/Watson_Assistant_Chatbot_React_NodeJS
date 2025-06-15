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
var AssistantController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assistant_service_1 = require("./assistant.service");
const message_dto_1 = require("./dto/message.dto");
const session_guard_1 = require("./guards/session.guard");
let AssistantController = AssistantController_1 = class AssistantController {
    constructor(assistantService) {
        this.assistantService = assistantService;
        this.logger = new common_1.Logger(AssistantController_1.name);
    }
    async createSession() {
        const response = await this.assistantService.generateNewSession();
        return response.data;
    }
    async deleteSession() {
        const response = await this.assistantService.deleteSession();
        return response.data;
    }
    async sendMessage(body, headers) {
        const chatId = headers.sessionid;
        const response = await this.assistantService.sendMessage(body.message, chatId);
        return response.data;
    }
};
__decorate([
    (0, common_1.Post)('session'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssistantController.prototype, "createSession", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('sessionid'),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Delete)('session'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssistantController.prototype, "deleteSession", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('sessionid'),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto, Object]),
    __metadata("design:returntype", Promise)
], AssistantController.prototype, "sendMessage", null);
AssistantController = AssistantController_1 = __decorate([
    (0, swagger_1.ApiTags)('assistant'),
    (0, common_1.Controller)('assistant'),
    __metadata("design:paramtypes", [assistant_service_1.AssistantService])
], AssistantController);
exports.AssistantController = AssistantController;
//# sourceMappingURL=assistant.controller.js.map