import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SessionGuard implements CanActivate {
    private readonly httpService;
    constructor(httpService: HttpService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
