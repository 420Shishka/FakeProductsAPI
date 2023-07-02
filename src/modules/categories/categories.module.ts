import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

import { FakeApiService } from 'src/shared';

@Module({
  providers: [CategoriesService, FakeApiService],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
