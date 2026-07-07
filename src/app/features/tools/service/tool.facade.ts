import { inject, Injectable, signal, computed } from '@angular/core';
import {
  GeneratePasswordUseCase,
  DecodeJwtUseCase,
  FormatJsonUseCase,
  GeneratePaletteUseCase,
  Base64UseCase,
  QrGeneratorUseCase,
  TimestampUseCase,
  UuidGeneratorUseCase
} from '@core/application/use-cases/tools';
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
export class ToolFacade {
  private readonly generatePasswordUseCase = inject(GeneratePasswordUseCase);
  private readonly decodeJwtUseCase = inject(DecodeJwtUseCase);
  private readonly formatJsonUseCase = inject(FormatJsonUseCase);
  private readonly generatePaletteUseCase = inject(GeneratePaletteUseCase);
  private readonly base64UseCase = inject(Base64UseCase);
  private readonly qrGeneratorUseCase = inject(QrGeneratorUseCase);
  private readonly timestampUseCase = inject(TimestampUseCase);
  private readonly uuidGeneratorUseCase = inject(UuidGeneratorUseCase);

  // ── Signals ──
  readonly passwordResult = signal<PasswordGeneratorResponse | null>(null);
  readonly jwtResult = signal<JwtDecodeResponse | null>(null);
  readonly jsonResult = signal<JsonFormatterResponse | null>(null);
  readonly paletteResult = signal<ColorPaletteResponse | null>(null);
  readonly base64Result = signal<Base64Response | null>(null);
  readonly qrResult = signal<QrGeneratorResponse | null>(null);
  readonly timestampResult = signal<TimestampToDateResponse | DateToTimestampResponse | TimestampCurrentResponse | null>(null);
  readonly uuidResult = signal<UuidSingleResponse | UuidBulkResponse | null>(null);

  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Acciones ──

  async generatePassword(request: PasswordGeneratorRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.generatePasswordUseCase.execute(request);
      this.passwordResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar la contraseña');
      throw err;
    }
  }

  async decodeJwt(request: JwtDecodeRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.decodeJwtUseCase.execute(request);
      this.jwtResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al decodificar el token JWT');
      throw err;
    }
  }

  async formatJson(request: JsonFormatterRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.formatJsonUseCase.execute(request);
      this.jsonResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al formatear JSON');
      throw err;
    }
  }

  async generatePalette(request: ColorPaletteRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.generatePaletteUseCase.execute(request);
      this.paletteResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar la paleta de colores');
      throw err;
    }
  }

  async encodeDecodeBase64(request: Base64Request): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.base64UseCase.execute(request);
      this.base64Result.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al procesar Base64');
      throw err;
    }
  }

  async generateQr(request: QrGeneratorRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.qrGeneratorUseCase.execute(request);
      this.qrResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar código QR');
      throw err;
    }
  }

  async fetchCurrentTimestamp(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.timestampUseCase.getCurrent();
      this.timestampResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al cargar timestamp actual');
      throw err;
    }
  }

  async convertTimestampToDate(request: TimestampToDateRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.timestampUseCase.toDate(request);
      this.timestampResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al convertir timestamp a fecha');
      throw err;
    }
  }

  async convertDateToTimestamp(request: DateToTimestampRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.timestampUseCase.toTimestamp(request);
      this.timestampResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al convertir fecha a timestamp');
      throw err;
    }
  }

  async generateUuid(version: UuidVersion): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.uuidGeneratorUseCase.generate(version);
      this.uuidResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar UUID');
      throw err;
    }
  }

  async generateUuidBulk(count: number, version: UuidVersion): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.uuidGeneratorUseCase.generateBulk(count, version);
      this.uuidResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar UUIDs múltiples');
      throw err;
    }
  }
}
