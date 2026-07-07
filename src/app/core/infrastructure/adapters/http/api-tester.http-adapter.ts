import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_CONFIG } from '../../../config/api.config';
import { ApiTesterMapper } from '@core/application/mappers/api-tester.mapper';
import {
  ApiTesterRequest,
  ApiTesterResponse,
  SaveRequestPayload,
  CollectionPayload,
} from '../../../interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiTesterHttpAdapter {
  private readonly http = inject(HttpClient);

  private getUrl(path: string): string {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.API_TESTER}${path}`;
  }

  async executeRequest(request: ApiTesterRequest): Promise<ApiTesterResponse> {
    const backendReq = ApiTesterMapper.toBackendRequest(request);
    return firstValueFrom(
      this.http.post<ApiTesterResponse>(this.getUrl('/execute'), backendReq)
    );
  }

  async saveRequest(payload: SaveRequestPayload): Promise<SaveRequestPayload> {
    const backendPayload = ApiTesterMapper.toBackendPayload(payload);
    const res = await firstValueFrom(
      this.http.post<any>(this.getUrl('/save'), backendPayload)
    );
    return ApiTesterMapper.toFrontendPayload(res);
  }

  async getHistory(): Promise<SaveRequestPayload[]> {
    const res = await firstValueFrom(
      this.http.get<any[]>(this.getUrl('/history'))
    );
    return res.map((item) => ApiTesterMapper.toFrontendPayload(item));
  }

  async deleteHistory(id: string): Promise<boolean> {
    const response = await firstValueFrom(
      this.http.delete<{ success: boolean }>(this.getUrl(`/history/${id}`), {
        body: { id }
      })
    );
    return response.success;
  }

  async clearHistory(): Promise<boolean> {
    const response = await firstValueFrom(
      this.http.delete<{ success: boolean }>(this.getUrl('/history/delete'))
    );
    return response.success;
  }

  async createCollection(collection: CollectionPayload): Promise<CollectionPayload> {
    const backendCollection = {
      ...collection,
      requests: collection.requests.map((r) => ApiTesterMapper.toBackendPayload(r)),
    };
    const res = await firstValueFrom(
      this.http.post<any>(this.getUrl('/collections'), backendCollection)
    );
    return {
      ...res,
      requests: (res.requests || []).map((r: any) => ApiTesterMapper.toFrontendPayload(r)),
    };
  }

  async getCollections(): Promise<CollectionPayload[]> {
    const res = await firstValueFrom(
      this.http.get<any[]>(this.getUrl('/collections'))
    );
    return res.map((col) => ({
      ...col,
      requests: (col.requests || []).map((r: any) => ApiTesterMapper.toFrontendPayload(r)),
    }));
  }
}
