import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { PasswordGeneratorRequest, PasswordGeneratorResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneratePasswordUseCase {
  private readonly toolsRepository = inject(IToolsRepository);

  execute(request: PasswordGeneratorRequest): Promise<PasswordGeneratorResponse> {
    return this.toolsRepository.generatePassword(request);
  }
}