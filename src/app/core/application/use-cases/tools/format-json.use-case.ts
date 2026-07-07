import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { JsonFormatterRequest, JsonFormatterResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class FormatJsonUseCase {
  private readonly toolsRepository = inject(IToolsRepository);

  execute(request: JsonFormatterRequest): Promise<JsonFormatterResponse> {
    return this.toolsRepository.formatJson(request);
  }
}