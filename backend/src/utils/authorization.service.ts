import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationService {
    getAuthorizationHeader() {
        const authHeader = `Basic ${Buffer.from(
            `${process.env.ACTIONS_USERNAME_SNOW}:${process.env.ACTIONS_PASSWORD_SNOW}`
          ).toString('base64')}`;
      
          return authHeader
    }
}
