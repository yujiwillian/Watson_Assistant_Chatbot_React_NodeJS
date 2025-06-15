"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogdnaService = void 0;
class LogdnaService {
    log(message) {
        console.log(message);
    }
    error(message, trace) {
        console.error(message);
    }
    warn(message) {
        console.warn(message);
    }
    constructor(context, isTimestampEnabled) {
    }
}
exports.LogdnaService = LogdnaService;
//# sourceMappingURL=logdna.service.js.map