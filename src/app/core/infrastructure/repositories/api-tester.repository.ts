import { Injectable, inject } from '@angular/core';
import { IApiTesterRepository } from '../../domain/repositories/api-tester.repositories.interface';
import { ApiTesterHttpAdapter } from '../adapters/http/api-tester.http-adapter';
import {
  ApiTesterRequest,
  ApiTesterResponse,
  SaveRequestPayload,
  CollectionPayload,
} from '../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiTesterRepository implements IApiTesterRepository {
  private readonly httpAdapter = inject(ApiTesterHttpAdapter);

  executeRequest(request: ApiTesterRequest): Promise<ApiTesterResponse> {
    return this.httpAdapter.executeRequest(request);
  }

  saveRequest(payload: SaveRequestPayload): Promise<SaveRequestPayload> {
    return this.httpAdapter.saveRequest(payload);
  }

  getHistory(): Promise<SaveRequestPayload[]> {
    return this.httpAdapter.getHistory();
  }

  deleteHistory(id: string): Promise<boolean> {
    return this.httpAdapter.deleteHistory(id);
  }

  clearHistory(): Promise<boolean> {
    return this.httpAdapter.clearHistory();
  }

  createCollection(collection: CollectionPayload): Promise<CollectionPayload> {
    return this.httpAdapter.createCollection(collection);
  }

  getCollections(): Promise<CollectionPayload[]> {
    return this.httpAdapter.getCollections();
  }
}
