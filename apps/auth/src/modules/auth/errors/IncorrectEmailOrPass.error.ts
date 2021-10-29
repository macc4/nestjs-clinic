import { UnauthorizedException } from '@nestjs/common';

export class IncorrectEmailOrPassException extends UnauthorizedException {
  constructor() {
    super('Incorrect email or password');
  }
}
