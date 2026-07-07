import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiKeyRepositoryInterface } from '@core/domain/repositories/api-key.repositories.interface';
import { ApiKeyHttpAdapter } from '../adapters/http/api-key.http-adapter';
import { MessageResponse } from '@core/interfaces/auth.interface';
import {
  CreateApiKeyRequest,
  ApiKeyResponse,
  ApiKeyListResponse,
  ApiKeyStatsResponse
} from '@core/interfaces/api-key.interface';

@Injectable()
export class ApiKeyRepository implements ApiKeyRepositoryInterface {
  private readonly httpAdapter = inject(ApiKeyHttpAdapter);

  createApiKey(request: CreateApiKeyRequest): Promise<ApiKeyResponse> {
    return firstValueFrom(this.httpAdapter.createApiKey(request));
  }

  listApiKeys(): Promise<ApiKeyListResponse> {
    return firstValueFrom(this.httpAdapter.listApiKeys());
  }

  getApiKeyStats(id: string): Promise<ApiKeyStatsResponse> {
    return firstValueFrom(this.httpAdapter.getApiKeyStats(id));
  }

  revokeApiKey(id: string): Promise<MessageResponse> {
    return firstValueFrom(this.httpAdapter.revokeApiKey(id));
  }

  deleteApiKey(id: string): Promise<MessageResponse> {
    return firstValueFrom(this.httpAdapter.deleteApiKey(id));
  }
}
