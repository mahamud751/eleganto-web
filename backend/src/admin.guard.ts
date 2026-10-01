import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const user = await this.auth.requireUser(context.switchToHttp().getRequest().headers.authorization);
    if (user.role !== 'ADMIN') throw new ForbiddenException('Admin access only');
    return true;
  }
}
