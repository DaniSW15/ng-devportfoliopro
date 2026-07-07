import {
  ApiTesterRequest,
  ApiTesterResponse,
  SaveRequestPayload,
  CollectionPayload,
} from '../../interfaces/tools.interface';

export abstract class IApiTesterRepository {
  abstract executeRequest(request: ApiTesterRequest): Promise<ApiTesterResponse>;
  abstract saveRequest(payload: SaveRequestPayload): Promise<SaveRequestPayload>;
  abstract getHistory(): Promise<SaveRequestPayload[]>;
  abstract deleteHistory(id: string): Promise<boolean>;
  abstract clearHistory(): Promise<boolean>;
  abstract createCollection(collection: CollectionPayload): Promise<CollectionPayload>;
  abstract getCollections(): Promise<CollectionPayload[]>;
}
