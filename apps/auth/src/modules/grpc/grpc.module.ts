import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileService } from './grpc-profile.service';
import { ClinicService } from './grpc-clinic.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  providers: [
    ClinicService,
    ProfileService,
    {
      provide: 'CLINIC_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'clinic',
            protoPath: join(__dirname, '../../../grpc/clinic.proto'),
            url: `${configService.get(
              'CLINIC_SERVICE_GRPC_HOST',
            )}:${configService.get('CLINIC_SERVICE_GRPC_PORT')}`,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'PROFILE_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'profile',
            protoPath: join(__dirname, '../../../grpc/profile.proto'),
            url: `${configService.get(
              'PROFILE_SERVICE_GRPC_HOST',
            )}:${configService.get('PROFILE_SERVICE_GRPC_PORT')}`,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [ClinicService, ProfileService],
})
export class GRPCModule {}
