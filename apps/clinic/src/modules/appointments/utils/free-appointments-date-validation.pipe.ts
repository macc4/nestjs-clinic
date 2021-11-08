import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FreeAppointmentsDateValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (isValidDate(value)) {
      return value;
    } else
      throw new BadRequestException('Invalid date format, YYYY-MM-DD expected');
  }
}

function isValidDate(dateString) {
  const regEx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  return dateString.match(regEx) != null;
}
