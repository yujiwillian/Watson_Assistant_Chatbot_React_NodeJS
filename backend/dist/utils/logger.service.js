"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const snow_service_1 = require("../actions/snow/snow.service");
let LoggerService = class LoggerService {
    constructor() {
        this.logger = new common_2.Logger(snow_service_1.SnowService.name);
        this.loggerLevel = process.env.LOGGER_LEVEL;
    }
    throwError(err, text) {
        if (this.loggerLevel.includes('info') ||
            this.loggerLevel.includes('error')) {
            this.logger.error(text);
            this.logger.error(err.message);
            return console.log({
                stack: err.stack || [],
                method: err.config.method || [],
                url: err.config.url || [],
                data: err.config.data || [],
                headers: Object.assign(Object.assign({}, err.config.headers), { Authorization: '***********' }) || [],
                response: {
                    status: err.response.status || [],
                    statusText: err.response.statusText || [],
                    data: JSON.stringify(err.response.data) || [],
                },
            });
        }
        return err;
    }
    debugLog(message, object) {
        var _a, _b, _c, _d, _e;
        if (this.loggerLevel.includes('info') ||
            this.loggerLevel.includes('debug')) {
            this.logger.debug(message);
            if (typeof object === 'object') {
                return console.log({
                    status: object.status || [],
                    headers: object.headers || [],
                    config: Object.assign(Object.assign({}, (object.config || [])), { headers: Object.assign(Object.assign({}, (((_a = object.config) === null || _a === void 0 ? void 0 : _a.headers) || [])), { Authorization: '*************' || [] }) }),
                    options: Object.assign(Object.assign({}, (((_b = object.options) === null || _b === void 0 ? void 0 : _b.proxy) || [])), { proxyAuth: ((_c = object.options) === null || _c === void 0 ? void 0 : _c.proxyAuth)
                            ? '************'
                            : [], headers: ((_e = (_d = object.options) === null || _d === void 0 ? void 0 : _d.proxy) === null || _e === void 0 ? void 0 : _e.headers) || [] }) || [],
                });
            }
        }
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)()
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map