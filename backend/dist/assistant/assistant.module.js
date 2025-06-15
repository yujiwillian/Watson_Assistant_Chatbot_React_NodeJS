"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const assistant_service_1 = require("./assistant.service");
const assistant_controller_1 = require("./assistant.controller");
const config_1 = require("@nestjs/config");
const session_guard_1 = require("./guards/session.guard");
const common_2 = require("@nestjs/common");
let AssistantModule = class AssistantModule {
};
AssistantModule = __decorate([
    (0, common_1.Module)({
        providers: [assistant_service_1.AssistantService, session_guard_1.SessionGuard],
        imports: [
            axios_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const env = process.env.NODE_ENV;
                    common_2.Logger.log('NODE_ENV: ', env);
                    const assistantId = env === 'homologation'
                        ? configService.get('ASSISTANT_ID_DEV')
                        : configService.get('ASSISTANT_ID');
                    common_2.Logger.log('ASSISTANT ID: ', assistantId);
                    return {
                        baseURL: configService.get('ASSISTANT_API'),
                        headers: {
                            assistantId: assistantId
                                .replace(/(\\r\\n|\\n|\\r)/gm, '')
                                .replace(/[^a-z0-9 ,._/:-]/gi, '')
                                .trim(),
                            token: 'Bearer ' +
                                configService
                                    .get('WATSON_API_KEY')
                                    .replace(/(\\r\\n|\\n|\\r)/gm, '')
                                    .replace(/[^a-z0-9 ,._/:-]/gi, '')
                                    .trim(),
                            assistantUrl: configService
                                .get('WATSON_API_URL')
                                .replace(/(\\r\\n|\\n|\\r)/gm, '')
                                .replace(/[^a-z0-9 ,._/:-]/gi, '')
                                .trim(),
                        },
                    };
                },
            }),
        ],
        controllers: [assistant_controller_1.AssistantController],
        exports: [assistant_service_1.AssistantService],
    })
], AssistantModule);
exports.AssistantModule = AssistantModule;
//# sourceMappingURL=assistant.module.js.map