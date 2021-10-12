import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { GetUser } from '../auth/utils/get-user.decorator';
import { User } from '../users/user.entity';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Post()
  @UseGuards(AuthGuard())
  //
  @ApiOperation({ summary: 'Get into queue via personal patient ID' })
  @ApiCreatedResponse({
    description:
      'Adds personal patient ID in the redis queue and returns the current position',
  })
  @ApiBearerAuth()
  //
  enqueue(@GetUser() user: User): Promise<number> {
    return this.queueService.enqueue(user);
  }

  @Get()
  //
  @ApiOperation({
    summary: 'Retrieve patientId of the next patient in the queue',
  })
  @ApiOkResponse({
    description: 'Returns the patientId of the current patient',
  })
  //
  peek(): Promise<string> {
    return this.queueService.peek();
  }

  @Delete()
  @HttpCode(StatusCodes.NO_CONTENT)
  //
  @ApiOperation({ summary: 'Dequeue current patient from the queue' })
  @ApiOkResponse({
    description: 'Deletes the patientId of the current patient',
  })
  //
  dequeue(): Promise<void> {
    return this.queueService.dequeue();
  }
}
