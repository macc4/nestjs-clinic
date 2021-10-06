import { Module } from '@nestjs/common';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [SharedModule, ResolutionsModule],
})
export class AppModule {}
