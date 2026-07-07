import { inject, Injectable } from '@angular/core';
import { ApiKeyRepositoryInterface } from '@core/domain/repositories/api-key.repositories.interface';
import { ApiKeyListResponse } from '@core/interfaces/api-key.interface';

@Injectable({
  providedIn: 'root',
})
export class ListApiKeysUseCase {
  private readonly repository = inject(ApiKeyRepositoryInterface);

  execute(): Promise<ApiKeyListResponse> {
    return this.repository.listApiKeys();
  }
}
