import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '../config';

@Injectable()
export class GRPCGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(context: ExecutionContext) {
    const arr = context.getArgs()[1]?.internalRepr.get('token');

    const token = arr ? arr[0] : null;

    return token === this.configService.get('JWT_SECRET');
  }
}