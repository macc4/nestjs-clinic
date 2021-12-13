import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { ProfileGRPCService } from './profile.grpc.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProfileRepository])],
  controllers: [ProfileController, ProfileGRPCService],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
