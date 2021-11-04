import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpProfileService } from './http-profile.service';
import { HttpClinicService } from './http-clinic.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [HttpProfileService, HttpClinicService],
  exports: [HttpProfileService, HttpClinicService],
})
export class HttpWrapperModule {}
