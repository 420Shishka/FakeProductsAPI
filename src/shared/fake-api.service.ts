import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiResponse } from 'src/models';

type RequestOptions = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: {
    [key: string]: any;
  };
  body?: any;
}

@Injectable()
export class FakeApiService {
  constructor(private readonly configService: ConfigService) { }

  public async call<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const baseUrl = this.configService.get<string>('FAKE_STORAGE_API_URL');

    if (!baseUrl) {
      throw new Error('.env variable FAKE_STORAGE_API_URL is not defined');
    }

    const url = baseUrl + options.path;
    const params = new URLSearchParams(options.params ?? {}).toString();

    const response = await fetch(`${url}?${params}`, {
      ...(options.body && { body: options.body }),
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }
}
