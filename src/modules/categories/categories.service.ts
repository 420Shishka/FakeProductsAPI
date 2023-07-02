import { Injectable } from '@nestjs/common';

import { ApiResponse, ICategory } from 'src/models';
import { FakeApiService } from 'src/shared';

@Injectable()
export class CategoriesService {
  constructor(private readonly fakeApiService: FakeApiService) { }

  public async getCategoryById(id: number): Promise<ApiResponse<ICategory>> {
    return this.fakeApiService.call<ICategory>({
      path: `/categories/${id}`,
      method: 'get',
    });
  }
}
