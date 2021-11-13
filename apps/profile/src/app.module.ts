import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [SharedModule, ProfileModule],
})
export class AppModule {}
