import { inject, Injectable } from '@angular/core';
import { ApiKeyRepositoryInterface } from '@core/domain/repositories/api-key.repositories.interface';
import { MessageResponse } from '@core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class DeleteApiKeyUseCase {
  private readonly repository = inject(ApiKeyRepositoryInterface);

  execute(id: string): Promise<MessageResponse> {
    return this.repository.deleteApiKey(id);
  }
}
