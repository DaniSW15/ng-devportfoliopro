import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { ColorPaletteRequest, ColorPaletteResponse } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneratePaletteUseCase {
  private readonly toolsRepository = inject(IToolsRepository);

  execute(request: ColorPaletteRequest): Promise<ColorPaletteResponse> {
    return this.toolsRepository.generatePalette(request);
  }
}
