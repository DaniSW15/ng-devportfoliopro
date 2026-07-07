import { inject, Injectable } from '@angular/core';
import { ApiKeyRepositoryInterface } from '@core/domain/repositories/api-key.repositories.interface';
import { ApiKeyStatsResponse } from '@core/interfaces/api-key.interface';

@Injectable({
  providedIn: 'root',
})
export class GetApiKeyStatsUseCase {
  private readonly repository = inject(ApiKeyRepositoryInterface);

  execute(id: string): Promise<ApiKeyStatsResponse> {
    return this.repository.getApiKeyStats(id);
  }
}
