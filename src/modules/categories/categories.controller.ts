import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { ApiResponse, IApiError, ICategory } from 'src/models';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get(':id')
  public async getCategoryById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponse<ICategory>> {
    const category = await this.categoriesService.getCategoryById(id);

    if ((<IApiError>category).name === 'EntityNotFoundError') {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
