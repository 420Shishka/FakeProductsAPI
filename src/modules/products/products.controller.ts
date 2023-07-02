import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';

import { IProduct, IApiError, ApiResponse } from '../../models';
import { CategoriesService } from '../categories/categories.service';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) { }

  @Get()
  public async getProducts(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number
  ): Promise<ApiResponse<IProduct[]>> {
    return this.productsService.getProducts(offset, limit);
  }

  @Get(':id')
  public async getProductById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponse<IProduct>> {
    const product = await this.productsService.getProductById(id);

    if ((<IApiError>product).name === 'EntityNotFoundError') {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  @Post()
  public async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ApiResponse<IProduct>> {
    const { categoryId } = createProductDto;
    const category = await this.categoriesService.getCategoryById(categoryId);

    if ((<IApiError>category).name === 'EntityNotFoundError') {
      throw new HttpException(
        `Category with id '${categoryId}' not found`, HttpStatus.BAD_REQUEST
      );
    }

    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  public async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ApiResponse<IProduct>> {
    const product = await this.productsService.getProductById(id);
    const isCategorySpecified = Reflect.has(updateProductDto, 'categoryId');
    const categoryId = updateProductDto.categoryId!;

    if ((<IApiError>product).name === 'EntityNotFoundError') {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const category = isCategorySpecified
      ? await this.categoriesService.getCategoryById(categoryId)
      : null;

    if ((<IApiError>category)?.name === 'EntityNotFoundError') {
      throw new HttpException(
        `Category with id '${categoryId}' not found`, HttpStatus.BAD_REQUEST
      );
    }

    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  public async deleteProduct(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponse<boolean>> {
    const product = await this.productsService.getProductById(id);

    if ((<IApiError>product).name === 'EntityNotFoundError') {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productsService.deleteProduct(id);
  }
}
