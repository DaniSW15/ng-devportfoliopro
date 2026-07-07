import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import {
  PasswordGeneratorRequest,
  PasswordGeneratorResponse,
  JwtDecodeRequest,
  JwtDecodeResponse,
  JsonFormatterRequest,
  JsonFormatterResponse
} from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class ToolsHttpAdapter {
  private readonly http = inject(HttpClient);

  generatePassword(request: PasswordGeneratorRequest): Observable<PasswordGeneratorResponse> {
    return this.http.post<PasswordGeneratorResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.PASSWORD_GENERATOR}`,
      request
    );
  }

  decodeJwt(request: JwtDecodeRequest): Observable<JwtDecodeResponse> {
    return this.http.post<JwtDecodeResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.JWT_DECODER}`,
      request
    );
  }

  formatJson(request: JsonFormatterRequest): Observable<JsonFormatterResponse> {
    return this.http.post<JsonFormatterResponse>(
      `${API_CONFIG.BASE_URL}/json-formatter`,
      request
    );
  }
}