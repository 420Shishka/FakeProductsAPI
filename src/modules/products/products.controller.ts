import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

import { IProduct } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  public async getProducts(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number
  ): Promise<IProduct[]> {
    return this.productsService.getProducts(offset, limit);
  }
}
