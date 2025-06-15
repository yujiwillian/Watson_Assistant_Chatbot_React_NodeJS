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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ChatDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0f46f678-f141-4948-b3be-e20f9d3772cb',
        description: 'Chat id of the conversation',
        required: false,
    }),
    __metadata("design:type", String)
], ChatDto.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Seguradora',
        description: 'The watson response',
        required: false,
    }),
    __metadata("design:type", String)
], ChatDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'The payload we send to watson assistant',
        required: false,
    }),
    __metadata("design:type", Object)
], ChatDto.prototype, "payload", void 0);
exports.ChatDto = ChatDto;
//# sourceMappingURL=chat.dto.js.map