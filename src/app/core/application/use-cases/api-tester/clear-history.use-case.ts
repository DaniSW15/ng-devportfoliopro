import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';

@Injectable({
  providedIn: 'root',
})
export class ClearHistoryUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(): Promise<boolean> {
    return this.repository.clearHistory();
  }
}
