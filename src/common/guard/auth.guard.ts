import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private reflector: Reflector) {
  //   super();
  // }
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const _class = context.getClass();
  //   const roles = this.reflector.get('ROLE', _class);
  //   const request = context.switchToHttp().getRequest();
  //   if (!roles.includes(request.user.role)) {
  //     throw new ForbiddenException(
  //       'У вас нет прав для доступа к этому ресурсу',
  //     );
  //   }
  //   return true;
  // }
}
