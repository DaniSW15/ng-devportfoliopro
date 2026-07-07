import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';

@Injectable({
  providedIn: 'root',
})
export class DeleteHistoryUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(id: string): Promise<boolean> {
    return this.repository.deleteHistory(id);
  }
}
