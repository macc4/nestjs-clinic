import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { GetUserDto } from '../auth/dto/get-user.dto';
import { GetUser } from '../auth/utils/get-user.decorator';
import { JwtGuard } from '../auth/utils/jwt.guard';
import { Roles } from '../auth/utils/restrict-roles.decorator';
import { RolesGuard } from '../auth/utils/restrict-roles.guard';
import { UserRole } from '../users/enums/user-role.enum';
import { QueueService } from './queue.service';

@Controller('queue')
@ApiTags('queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  //
  // Get into specified doctor's queue
  //

  @Post('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.PATIENT)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get into queue via personal patient ID stored in JWT',
  })
  @ApiCreatedResponse({
    description:
      'Adds personal patient ID in the redis queue and returns the current position',
  })
  enqueueAsPatient(
    @Param('id') id: string,
    @GetUser() user: GetUserDto,
  ): Promise<{ message: string }> {
    return this.queueService.enqueueAsPatient(+id, user);
  }

  //
  // Get current patient in the specified doctor's queue
  //

  @Get('/:id')
  @ApiOperation({
    summary: 'Retrieve patientId of the next patient in the queue',
  })
  @ApiOkResponse({
    description: 'Returns the patientId of the current patient',
  })
  peekAsPatient(@Param('id') id: string): Promise<string> {
    return this.queueService.peekAsPatient(+id);
  }

  //
  // Get current patient in the doctor's own queue
  //

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retrieve patientId of the next patient in the queue',
  })
  @ApiOkResponse({
    description: 'Returns the patientId of the current patient',
  })
  peekAsDoctor(@GetUser() user: GetUserDto): Promise<string> {
    return this.queueService.peekAsDoctor(user);
  }

  //
  // Delete current patient from the doctor's own queue
  //

  @Delete()
  @HttpCode(StatusCodes.NO_CONTENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dequeue current patient from the queue' })
  @ApiOkResponse({
    description: 'Deletes the patientId of the current patient',
  })
  dequeueAsDoctor(@GetUser() user: GetUserDto): Promise<void> {
    return this.queueService.dequeueAsDoctor(user);
  }
}
