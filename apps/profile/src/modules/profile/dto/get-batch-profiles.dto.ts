import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetBatchProfilesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4, { each: true })
  userIds: string[];
}
