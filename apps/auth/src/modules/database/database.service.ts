import { Injectable } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class DatabaseService {
  getDbHandle(): Connection {
    return getConnection();
  }
}
