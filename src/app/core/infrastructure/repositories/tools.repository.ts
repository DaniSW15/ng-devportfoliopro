import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { ToolsHttpAdapter } from '../adapters/http/tools.http-adapter';
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

@Injectable()
export class ToolsRepository implements IToolsRepository {
  private readonly httpAdapter = inject(ToolsHttpAdapter);

  async generatePassword(request: PasswordGeneratorRequest): Promise<PasswordGeneratorResponse> {
    return firstValueFrom(this.httpAdapter.generatePassword(request));
  }

  async decodeJwt(request: JwtDecodeRequest): Promise<JwtDecodeResponse> {
    return firstValueFrom(this.httpAdapter.decodeJwt(request));
  }

  async formatJson(request: JsonFormatterRequest): Promise<JsonFormatterResponse> {
    return firstValueFrom(this.httpAdapter.formatJson(request));
  }

  async generatePalette(request: ColorPaletteRequest): Promise<ColorPaletteResponse> {
    return firstValueFrom(this.httpAdapter.generatePalette(request));
  }

  async encodeDecodeBase64(request: Base64Request): Promise<Base64Response> {
    return firstValueFrom(this.httpAdapter.encodeDecodeBase64(request));
  }

  async generateQr(request: QrGeneratorRequest): Promise<QrGeneratorResponse> {
    return firstValueFrom(this.httpAdapter.generateQr(request));
  }

  async getCurrentTimestamp(): Promise<TimestampCurrentResponse> {
    return firstValueFrom(this.httpAdapter.getCurrentTimestamp());
  }

  async convertTimestampToDate(request: TimestampToDateRequest): Promise<TimestampToDateResponse> {
    return firstValueFrom(this.httpAdapter.convertTimestampToDate(request));
  }

  async convertDateToTimestamp(request: DateToTimestampRequest): Promise<DateToTimestampResponse> {
    return firstValueFrom(this.httpAdapter.convertDateToTimestamp(request));
  }

  async generateUuid(version: UuidVersion): Promise<UuidSingleResponse> {
    return firstValueFrom(this.httpAdapter.generateUuid(version));
  }

  async generateUuidBulk(count: number, version: UuidVersion): Promise<UuidBulkResponse> {
    return firstValueFrom(this.httpAdapter.generateUuidBulk(count, version));
  }
}