import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SnowService } from 'actions/snow/snow.service';
@Injectable()
export class LoggerService {
    private readonly logger: Logger = new Logger(SnowService.name);
    private loggerLevel = process.env.LOGGER_LEVEL;
    throwError(err: any, text: any) {
        if (
            this.loggerLevel.includes('info') ||
            this.loggerLevel.includes('error')
        ) {
            this.logger.error(text);
            this.logger.error(err.message);
            return console.log({
                stack: err.stack || [],
                method: err.config.method || [],
                url: err.config.url || [],
                data: err.config.data || [],
                headers:
                    {
                        ...err.config.headers,
                        Authorization: '***********',
                    } || [],
                response: {
                    status: err.response.status || [],
                    statusText: err.response.statusText || [],
                    data: JSON.stringify(err.response.data) || [],
                },
            });
        }
        return err;
    }

    debugLog(message: any, object?: any) {
        if (
            this.loggerLevel.includes('info') ||
            this.loggerLevel.includes('debug')
        ) {
            this.logger.debug(message);
            if (typeof object === 'object') {
                return console.log({
                    status: object.status || [],
                    headers: object.headers || [],
                    config: {
                        ...(object.config || []),
                        headers: {
                            ...(object.config?.headers || []),
                            Authorization: '*************' || [],
                        },
                    },
                    options:
                        {
                            ...(object.options?.proxy || []),
                            proxyAuth: object.options?.proxyAuth
                                ? '************'
                                : [],
                            headers: object.options?.proxy?.headers || [],
                        } || [],
                });
            }
        }
    }
}
