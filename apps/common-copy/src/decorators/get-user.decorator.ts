import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): any => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);
