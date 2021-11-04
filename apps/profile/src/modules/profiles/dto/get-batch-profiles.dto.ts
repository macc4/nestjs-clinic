import { IsString, IsUUID } from 'class-validator';

export class GetBatchProfilesDto {
  @IsUUID(4, { each: true })
  userIds: string[];
}
