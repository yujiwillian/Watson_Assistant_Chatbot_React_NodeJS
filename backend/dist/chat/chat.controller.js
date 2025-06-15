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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const chat_dto_1 = require("./dto/chat.dto");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nest_morgan_1 = require("nest-morgan");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(chat_service_1.ChatService.name);
    }
    async message(chatDto) {
        const { chatId, message, payload } = chatDto;
        const response = await this.chatService.run(chatId, message, 'web', payload);
        return response;
    }
    async attach(file, chatDto) {
        const { chatId, number } = chatDto;
        try {
            const result = this.chatService.attach(chatId, JSON.parse(number), file[0], 'web');
            console.log('log result anexo', result);
            return result;
        }
        catch (_a) {
            console.log('falha ao executar anexo');
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Interact with watson' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Watson Response',
        type: chat_dto_1.ChatDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "message", null);
__decorate([
    (0, common_1.Post)('attachment'),
    (0, swagger_1.ApiOperation)({ summary: 'Send an attachment to SIGS' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Attached successfully',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "attach", null);
ChatController = __decorate([
    (0, swagger_1.ApiTags)('chat'),
    (0, common_1.Controller)('chat'),
    (0, common_1.UseInterceptors)((0, nest_morgan_1.MorganInterceptor)('combined')),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map