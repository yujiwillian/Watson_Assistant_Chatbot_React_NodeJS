"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogdnaInterceptor = void 0;
const nest_morgan_1 = require("nest-morgan");
const logdna_service_1 = require("./logdna.service");
class LogdnaInterceptor extends (0, nest_morgan_1.MorganInterceptor)(':method :url :status - :response-time ms') {
    constructor(format, options) {
        super(format, options);
        this.logger = new logdna_service_1.LogdnaService(LogdnaInterceptor.name);
        this.options.stream = {
            write: (str) => {
                this.logger.log(str);
            },
        };
    }
}
exports.LogdnaInterceptor = LogdnaInterceptor;
//# sourceMappingURL=logdna.interceptor.js.map