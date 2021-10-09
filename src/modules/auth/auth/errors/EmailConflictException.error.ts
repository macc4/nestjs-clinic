import { ConflictException } from '@nestjs/common';

export class EmailConflictException extends ConflictException {
  constructor() {
    super('User with this email already exists');
  }
}
