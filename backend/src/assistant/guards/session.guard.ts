import { HttpService } from '@nestjs/axios';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly httpService: HttpService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        if (!request.headers.sessionid) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
