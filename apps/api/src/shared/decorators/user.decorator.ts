import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: user.decorator.ts ~ line 6 ~ request',
      request.user
    );

    return request.user;
  }
);
