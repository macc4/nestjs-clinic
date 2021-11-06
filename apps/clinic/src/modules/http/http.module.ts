import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpProfileService } from './http-profile.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [HttpProfileService],
  exports: [HttpProfileService],
})
export class HttpWrapperModule {}
