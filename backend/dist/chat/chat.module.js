"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const actions_module_1 = require("../actions/actions.module");
const actions_service_1 = require("../actions/actions.service");
const sigs_module_1 = require("../actions/sigs/sigs.module");
const snow_module_1 = require("../actions/snow/snow.module");
const assistant_module_1 = require("../assistant/assistant.module");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const type_service_1 = require("../utils/type.service");
const logger_service_1 = require("../utils/logger.service");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        controllers: [chat_controller_1.ChatController],
        imports: [assistant_module_1.AssistantModule, actions_module_1.ActionsModule, sigs_module_1.SigsModule, snow_module_1.SnowModule],
        providers: [chat_service_1.ChatService, actions_service_1.ActionsService, type_service_1.TypeService, logger_service_1.LoggerService],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map