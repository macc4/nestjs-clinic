import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppModule } from '../../app.module';
import { ProfileService } from '../grpc/grpc-profile.service';
import { ClinicService } from '../grpc/grpc-clinic.service';
import { DatabaseService } from '../database/database.service';

describe('Auth', () => {
  let app: INestApplication;
  let server: any;
  let dbConnection: Connection;

  jest.setTimeout(50000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('CLINIC_PACKAGE')
      .useValue({ getService: () => jest.fn() })
      .overrideProvider('PROFILE_PACKAGE')
      .useValue({ getService: () => jest.fn() })
      .overrideProvider(ClinicService)
      .useValue({ createPatient: () => jest.fn() })
      .overrideProvider(ProfileService)
      .useValue({ createProfile: () => jest.fn() })
      .compile();

    app = moduleRef.createNestApplication();
    server = app.getHttpAdapter().getInstance();

    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  it('POST /signup', async () => {
    expect.assertions(2);

    const email = 'patient-test@gmail.com';

    const response = await request(server).post('/auth/signup').send({
      email,
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      gender: 'male',
      birthDate: '1998-02-10T02:15:00.000Z',
    });

    await dbConnection.query(`
    DELETE FROM auth.users
    WHERE email = '${email}'
    `);

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
