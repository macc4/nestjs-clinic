import { IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  id: string;
}
