import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';
import { SaveRequestPayload } from '../../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class SaveRequestUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(payload: SaveRequestPayload): Promise<SaveRequestPayload> {
    return this.repository.saveRequest(payload);
  }
}
