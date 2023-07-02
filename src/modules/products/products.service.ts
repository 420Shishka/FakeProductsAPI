import { Injectable } from '@nestjs/common';

import { ApiResponse, IProduct } from '../../models';
import { FakeApiService } from '../../shared';

import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly fakeApiService: FakeApiService) { }

  public async getProducts(offset: number, limit: number): Promise<ApiResponse<IProduct[]>> {
    return this.fakeApiService.call<IProduct[]>({
      path: '/products',
      params: { offset, limit },
      method: 'get',
    });
  }

  public async getProductById(id: number): Promise<ApiResponse<IProduct>> {
    return this.fakeApiService.call<IProduct>({
      path: `/products/${id}`,
      method: 'get',
    });
  }

  public async createProduct(dto: CreateProductDto): Promise<ApiResponse<IProduct>> {
    return this.fakeApiService.call<IProduct>({
      path: '/products',
      method: 'post',
      body: JSON.stringify(dto),
    });
  }

  public async updateProduct(
    id: number,
    dto: UpdateProductDto
  ): Promise<ApiResponse<IProduct>> {
    return this.fakeApiService.call<IProduct>({
      path: `/products/${id}`,
      method: 'put',
      body: JSON.stringify(dto),
    });
  }

  public async deleteProduct(id: number): Promise<ApiResponse<boolean>> {
    return this.fakeApiService.call<boolean>({
      path: `/products/${id}`,
      method: 'delete',
    });
  }
}
