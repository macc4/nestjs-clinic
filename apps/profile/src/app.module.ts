import { Module } from '@nestjs/common';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [ProfilesModule, SharedModule],
})
export class AppModule {}
