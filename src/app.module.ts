import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';

@Module({
  imports: [SharedModule, ResolutionsModule],
})
export class AppModule {}
