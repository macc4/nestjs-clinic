import { Server } from 'socket.io';

export interface WsEvent<T> {
  readonly type: string;
  readonly server?: Server;
  emit(data: T): void;
}
