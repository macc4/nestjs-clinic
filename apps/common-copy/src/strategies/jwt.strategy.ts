import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserDto } from '../dto/get-user.dto';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ModuleOptions } from './options.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly options: ModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: options.secret,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<GetUserDto> {
    const { id, roles } = payload;

    const user = {
      id,
      roles,
    };

    return user;
  }
}
