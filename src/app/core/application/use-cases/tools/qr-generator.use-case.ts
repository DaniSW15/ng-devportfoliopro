import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { QrGeneratorRequest, QrGeneratorResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class QrGeneratorUseCase {
  private readonly repository = inject(IToolsRepository);

  execute(request: QrGeneratorRequest): Promise<QrGeneratorResponse> {
    return this.repository.generateQr(request);
  }
}
