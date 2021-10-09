import { NotFoundException } from '@nestjs/common';

export class UserNotFoundByEmailException extends NotFoundException {
  constructor(email?: string) {
    let message = 'No user found with this email';

    if (email) {
      message += `: ${email}`;
    }

    super(message);
  }
}
