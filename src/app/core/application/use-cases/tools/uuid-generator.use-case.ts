import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { UuidVersion, UuidSingleResponse, UuidBulkResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class UuidGeneratorUseCase {
  private readonly repository = inject(IToolsRepository);

  generate(version: UuidVersion): Promise<UuidSingleResponse> {
    return this.repository.generateUuid(version);
  }

  generateBulk(count: number, version: UuidVersion): Promise<UuidBulkResponse> {
    return this.repository.generateUuidBulk(count, version);
  }
}
