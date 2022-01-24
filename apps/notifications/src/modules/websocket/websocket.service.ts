import { JwtPayloadDto } from '@macc4-clinic/common';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  private readonly logger = new Logger(WebsocketService.name);

  constructor(private readonly jwtService: JwtService) {}

  verifyJwtAndGetPayload(client: Socket): JwtPayloadDto {
    let user: JwtPayloadDto;

    try {
      const bearerToken: string =
        client.handshake.headers.authorization.split(' ')[1];

      user = this.jwtService.verify(bearerToken);
    } catch (error) {
      this.logger.error(error);

      throw new WsException('Unauthorized');
    }

    return user;
  }

  async joinRoom(client: Socket, room: string): Promise<void> {
    await client.join(room);
  }

  async leaveRoom(client: Socket, room: string): Promise<void> {
    await client.leave(room);
  }
}
