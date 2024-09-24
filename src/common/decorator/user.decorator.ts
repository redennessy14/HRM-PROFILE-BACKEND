import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ProfileEntity } from 'src/data-access';

export const CurrentUser = createParamDecorator(
  (data: keyof ProfileEntity | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return undefined;
    }
    return data ? user[data] : user;
  },
);
