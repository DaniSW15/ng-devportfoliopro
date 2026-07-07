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

export abstract class IToolsRepository {
  abstract generatePassword(request: PasswordGeneratorRequest): Promise<PasswordGeneratorResponse>;
  abstract decodeJwt(request: JwtDecodeRequest): Promise<JwtDecodeResponse>;
  abstract formatJson(request: JsonFormatterRequest): Promise<JsonFormatterResponse>;
  abstract generatePalette(request: ColorPaletteRequest): Promise<ColorPaletteResponse>;
  
  abstract encodeDecodeBase64(request: Base64Request): Promise<Base64Response>;
  abstract generateQr(request: QrGeneratorRequest): Promise<QrGeneratorResponse>;
  
  abstract getCurrentTimestamp(): Promise<TimestampCurrentResponse>;
  abstract convertTimestampToDate(request: TimestampToDateRequest): Promise<TimestampToDateResponse>;
  abstract convertDateToTimestamp(request: DateToTimestampRequest): Promise<DateToTimestampResponse>;
  
  abstract generateUuid(version: UuidVersion): Promise<UuidSingleResponse>;
  abstract generateUuidBulk(count: number, version: UuidVersion): Promise<UuidBulkResponse>;
}