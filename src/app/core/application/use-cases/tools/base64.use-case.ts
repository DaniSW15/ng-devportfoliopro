import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { Base64Request, Base64Response } from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class Base64UseCase {
  private readonly repository = inject(IToolsRepository);

  execute(request: Base64Request): Promise<Base64Response> {
    return this.repository.encodeDecodeBase64(request);
  }
}
