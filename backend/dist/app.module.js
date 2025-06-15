"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const nest_morgan_1 = require("nest-morgan");
const logdna_interceptor_1 = require("./logdna/logdna.interceptor");
const logdna_module_1 = require("./logdna/logdna.module");
const assistant_module_1 = require("./assistant/assistant.module");
const teams_module_1 = require("./teams/teams.module");
const chat_module_1 = require("./chat/chat.module");
const actions_module_1 = require("./actions/actions.module");
const config_1 = require("@nestjs/config");
const sigs_module_1 = require("./actions/sigs/sigs.module");
const snow_module_1 = require("./actions/snow/snow.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_morgan_1.MorganModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            logdna_module_1.LogdnaModule,
            assistant_module_1.AssistantModule,
            teams_module_1.TeamsModule,
            chat_module_1.ChatModule,
            actions_module_1.ActionsModule,
            sigs_module_1.SigsModule,
            snow_module_1.SnowModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logdna_interceptor_1.LogdnaInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map