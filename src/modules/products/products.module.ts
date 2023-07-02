import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { CategoriesService } from '../categories/categories.service';
import { FakeApiService } from 'src/shared';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FakeApiService, CategoriesService]
})
export class ProductsModule { }
