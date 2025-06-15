"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeService = void 0;
const common_1 = require("@nestjs/common");
let TypeService = class TypeService {
    getTableName(value) {
        let data;
        switch (true) {
            case value.startsWith('INC'):
                data = {
                    url: `incident?sysparm_query=number=${value}&sysparm_exclude_reference_link=true&sysparm_display_value=true`,
                    table_name: 'incident',
                    type: true,
                };
                break;
            case value.startsWith('RITM'):
                data = {
                    url: `sc_task?request_item=${value}&sysparm_exclude_reference_link=true&sysparm_display_value=true`,
                    type: true,
                    table_name: 'sc_req_item',
                    url2: `sc_req_item?request=`,
                    ritm: true,
                };
                break;
            case value.startsWith('RS'):
                data = {
                    type: false,
                };
                break;
            case value.startsWith('IN'):
                data = {
                    type: false,
                };
                break;
            default:
                data = {
                    url: '',
                    table_name: '',
                };
                break;
        }
        return data;
    }
};
TypeService = __decorate([
    (0, common_1.Injectable)()
], TypeService);
exports.TypeService = TypeService;
//# sourceMappingURL=type.service.js.map