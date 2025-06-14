import { FormatFn, Options } from 'morgan';
import { MorganInterceptor } from 'nest-morgan';
import { LogdnaService } from './logdna.service';

export class LogdnaInterceptor extends MorganInterceptor(
    ':method :url :status - :response-time ms',
) {
    private readonly logger: LogdnaService = new LogdnaService(
        LogdnaInterceptor.name,
    );

    constructor(format: string | FormatFn, options?: Options<any, any>) {
        super(format, options);
        this.options.stream = {
            write: (str: string) => {
                this.logger.log(str);
            },
        };
    }
}
