import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';
import { ApiTesterRequest, ApiTesterResponse } from '../../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class ExecuteRequestUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(request: ApiTesterRequest): Promise<ApiTesterResponse> {
    return this.repository.executeRequest(request);
  }
}
