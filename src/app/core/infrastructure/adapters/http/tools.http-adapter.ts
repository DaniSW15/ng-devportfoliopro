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
  JsonFormatterResponse,
  ColorPaletteRequest,
  ColorPaletteResponse,
  Base64Request,
  Base64Response,
  QrGeneratorRequest,
  QrGeneratorResponse,
  TimestampCurrentResponse,
  TimestampToDateRequest,
  TimestampToDateResponse,
  DateToTimestampRequest,
  DateToTimestampResponse,
  UuidVersion,
  UuidSingleResponse,
  UuidBulkResponse
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
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.JSON_FORMATTER}`,
      request
    );
  }

  generatePalette(request: ColorPaletteRequest): Observable<ColorPaletteResponse> {
    return this.http.post<ColorPaletteResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.COLOR_PALETTE}`,
      request
    );
  }

  encodeDecodeBase64(request: Base64Request): Observable<Base64Response> {
    return this.http.post<Base64Response>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.BASE64}`,
      request
    );
  }

  generateQr(request: QrGeneratorRequest): Observable<QrGeneratorResponse> {
    return this.http.post<QrGeneratorResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.QR_GENERATOR}`,
      request
    );
  }

  getCurrentTimestamp(): Observable<TimestampCurrentResponse> {
    return this.http.get<TimestampCurrentResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.TIMESTAMP_CONVERTER}/current`
    );
  }

  convertTimestampToDate(request: TimestampToDateRequest): Observable<TimestampToDateResponse> {
    return this.http.post<TimestampToDateResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.TIMESTAMP_CONVERTER}/to-date`,
      request
    );
  }

  convertDateToTimestamp(request: DateToTimestampRequest): Observable<DateToTimestampResponse> {
    return this.http.post<DateToTimestampResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.TIMESTAMP_CONVERTER}/to-timestamp`,
      request
    );
  }

  generateUuid(version: UuidVersion): Observable<UuidSingleResponse> {
    return this.http.get<UuidSingleResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.UUID_GENERATOR}?version=${version}`
    );
  }

  generateUuidBulk(count: number, version: UuidVersion): Observable<UuidBulkResponse> {
    return this.http.get<UuidBulkResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.TOOLS.UUID_GENERATOR}/bulk?count=${count}&version=${version}`
    );
  }
}