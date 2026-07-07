import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';
import { SaveRequestPayload } from '../../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class GetHistoryUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(): Promise<SaveRequestPayload[]> {
    return this.repository.getHistory();
  }
}
