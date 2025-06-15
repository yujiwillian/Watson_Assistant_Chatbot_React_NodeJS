"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowModule = void 0;
const common_1 = require("@nestjs/common");
const snow_service_1 = require("./snow.service");
const axios_1 = require("@nestjs/axios");
const authorization_service_1 = require("../../utils/authorization.service");
const type_service_1 = require("../../utils/type.service");
const logger_service_1 = require("../../utils/logger.service");
let SnowModule = class SnowModule {
};
SnowModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [snow_service_1.SnowService, authorization_service_1.AuthorizationService, type_service_1.TypeService, logger_service_1.LoggerService],
        exports: [snow_service_1.SnowService],
    })
], SnowModule);
exports.SnowModule = SnowModule;
//# sourceMappingURL=snow.module.js.map