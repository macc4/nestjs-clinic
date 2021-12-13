import { IsUUID, UUIDVersion } from 'class-validator';

export class GetBatchProfilesDto {
  @IsUUID(4, { each: true })
  userIds: UUIDVersion[];
}
