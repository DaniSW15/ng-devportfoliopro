import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import { MessageResponse } from '@core/interfaces/auth.interface';
import {
  CreateApiKeyRequest,
  ApiKeyResponse,
  ApiKeyListResponse,
  ApiKeyStatsResponse
} from '@core/interfaces/api-key.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyHttpAdapter {
  private readonly http = inject(HttpClient);

  createApiKey(request: CreateApiKeyRequest): Observable<ApiKeyResponse> {
    return this.http.post<ApiKeyResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.API_KEYS.CREATE}`,
      request
    );
  }

  listApiKeys(): Observable<ApiKeyListResponse> {
    return this.http.get<ApiKeyListResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.API_KEYS.LIST}`
    );
  }

  getApiKeyStats(id: string): Observable<ApiKeyStatsResponse> {
    return this.http.get<ApiKeyStatsResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.API_KEYS.STATS(id)}`
    );
  }

  revokeApiKey(id: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.API_KEYS.DELETE(id)}`
    );
  }

  deleteApiKey(id: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.API_KEYS.DELETE_PERMANENT(id)}`
    );
  }
}
