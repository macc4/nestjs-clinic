import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProfileService } from './grpc-profile.service';

@Module({
  imports: [ConfigModule],
  providers: [
    ProfileService,
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
  exports: [ProfileService],
})
export class GRPCModule {}
