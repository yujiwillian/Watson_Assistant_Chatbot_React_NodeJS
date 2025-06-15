"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const common_1 = require("@nestjs/common");
let ProxyService = class ProxyService {
    getProxyConfig() {
        const isProxyEnabled = process.env.PROXY_ENABLED === 'true' ? true : false;
        console.log('isProxyEnabled', isProxyEnabled);
        const proxyConfig = {
            host: process.env.PROXY_URL,
            port: Number(process.env.PROXY_PORT),
            auth: {
                username: process.env.PROXY_USER,
                password: process.env.PROXY_PASS,
            }
        };
        return isProxyEnabled ? proxyConfig : null;
    }
};
ProxyService = __decorate([
    (0, common_1.Injectable)()
], ProxyService);
exports.ProxyService = ProxyService;
//# sourceMappingURL=proxy.service.js.map