"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const assistant_module_1 = require("../assistant/assistant.module");
const botbuilder_core_1 = require("botbuilder-core");
const teams_controller_1 = require("./teams.controller");
const teams_service_1 = require("./teams.service");
let TeamsModule = class TeamsModule {
};
TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_controller_1.TeamsController],
        imports: [assistant_module_1.AssistantModule],
        providers: [
            teams_service_1.TeamsService,
            {
                provide: 'ConversationState',
                useFactory: () => {
                    const memoryStorage = new botbuilder_core_1.MemoryStorage();
                    const conversationState = new botbuilder_core_1.ConversationState(memoryStorage);
                    return conversationState;
                },
            },
        ],
    })
], TeamsModule);
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map