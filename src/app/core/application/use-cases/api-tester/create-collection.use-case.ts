import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../../domain/repositories/api-tester.repositories.interface';
import { CollectionPayload } from '../../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCollectionUseCase {
  private readonly repository = inject(IApiTesterRepository);

  execute(collection: CollectionPayload): Promise<CollectionPayload> {
    return this.repository.createCollection(collection);
  }
}
