import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { JwtDecodeRequest, JwtDecodeResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class DecodeJwtUseCase {
  private readonly toolsRepository = inject(IToolsRepository);

  execute(request: JwtDecodeRequest): Promise<JwtDecodeResponse> {
    return this.toolsRepository.decodeJwt(request);
  }
}