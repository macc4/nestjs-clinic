import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string): string {
    if (isValidDate(value)) {
      return value;
    } else
      throw new BadRequestException(
        'Invalid date format, ISO 8061 string expected',
      );
  }
}

function isValidDate(dateString) {
  let date: Date;

  try {
    date = new Date(dateString);
  } catch (error) {
    return false;
  }

  return date;
}
