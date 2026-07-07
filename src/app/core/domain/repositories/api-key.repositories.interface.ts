import { MessageResponse } from '@core/interfaces/auth.interface';
import {
  CreateApiKeyRequest,
  ApiKeyResponse,
  ApiKeyListResponse,
  ApiKeyStatsResponse
} from '@core/interfaces/api-key.interface';

export abstract class ApiKeyRepositoryInterface {
  abstract createApiKey(request: CreateApiKeyRequest): Promise<ApiKeyResponse>;
  abstract listApiKeys(): Promise<ApiKeyListResponse>;
  abstract getApiKeyStats(id: string): Promise<ApiKeyStatsResponse>;
  abstract revokeApiKey(id: string): Promise<MessageResponse>;
  abstract deleteApiKey(id: string): Promise<MessageResponse>;
}
