import { inject, Injectable } from '@angular/core';
import { ApiKeyRepositoryInterface } from '@core/domain/repositories/api-key.repositories.interface';
import { CreateApiKeyRequest, ApiKeyResponse } from '@core/interfaces/api-key.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateApiKeyUseCase {
  private readonly repository = inject(ApiKeyRepositoryInterface);

  execute(request: CreateApiKeyRequest): Promise<ApiKeyResponse> {
    return this.repository.createApiKey(request);
  }
}
