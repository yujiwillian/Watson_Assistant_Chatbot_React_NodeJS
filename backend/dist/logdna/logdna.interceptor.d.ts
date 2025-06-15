import { FormatFn, Options } from 'morgan';
declare const LogdnaInterceptor_base: import("@nestjs/common").Type<any>;
export declare class LogdnaInterceptor extends LogdnaInterceptor_base {
    private readonly logger;
    constructor(format: string | FormatFn, options?: Options<any, any>);
}
export {};
