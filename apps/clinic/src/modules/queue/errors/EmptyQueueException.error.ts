import { NotFoundException } from '@nestjs/common';

export class EmptyQueueException extends NotFoundException {
  constructor(doctorId?: number) {
    const message = `The queue for doctorId ${doctorId} is empty`;

    super(message);
  }
}
