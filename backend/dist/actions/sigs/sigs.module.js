"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigsModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const sigs_service_1 = require("./sigs.service");
let SigsModule = class SigsModule {
};
SigsModule = __decorate([
    (0, common_1.Module)({
        providers: [sigs_service_1.SigsService],
        imports: [axios_1.HttpModule],
        exports: [sigs_service_1.SigsService],
    })
], SigsModule);
exports.SigsModule = SigsModule;
//# sourceMappingURL=sigs.module.js.map